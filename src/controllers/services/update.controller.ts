import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServicesModel } from "../../database/models/index.model";

export const UpdateServiceController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ inputError: errors.array()[0] });

  const { serviceId } = req.params;
  const updateData = req.body;

  try {
    // Buscar al empleado por ID
    const employee = await ServicesModel.findById(serviceId);
    if (!employee) return res.status(404).json({ message: 'Servicio no encontrado.' });

    // Actualizar campos opcionales
    Object.keys(updateData).forEach((key) => {
      (employee as any)[key] = updateData[key];
    });

    await employee.save();

    res.status(200).json({ message: 'Servicio actualizado correctamente.', employee });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el empleado.', error: error.message });
  }
};
