import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { EmployeesModel } from "../../database/models/index.model";

export const UpdateEmployeeController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { employeeId } = req.params;
  const updateData = req.body;

  try {
    // Buscar al empleado por ID
    const employee = await EmployeesModel.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Empleado no encontrado.' });

    // Actualizar campos opcionales
    Object.keys(updateData).forEach((key) => {
      if (key === 'info' && typeof updateData.info === 'object') {
        employee.info = { ...employee.info, ...updateData.info };
      } else {
        (employee as any)[key] = updateData[key];
      }
    });

    await employee.save();

    res.status(200).json({ message: 'Empleado actualizado correctamente.', employee });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el empleado.', error: error.message });
  }
};
