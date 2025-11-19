import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ServicesModel } from "../../database/models/index.model";
import mongoose from "mongoose";

export const UpdateServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] });

  const { serviceId } = req.params;
  const updateData = req.body;

  try {

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return next({
        message: "Invalid service ID.",
        httpStatus: 400,
        inputError: null
      });
    }

    // Buscar al empleado por ID
    const employee = await ServicesModel.findById(serviceId);
    if (!employee) return next({ status: 404, message: 'Servicio nt found.' });

    // Actualizar campos opcionales
    Object.keys(updateData).forEach((key) => {
      (employee as any)[key] = updateData[key];
    });

    await employee.save();

    return res.status(200).json({ message: 'Servicio actualizado correctamente.', employee });
  } catch (error) {
    return next(error)
  }
};
