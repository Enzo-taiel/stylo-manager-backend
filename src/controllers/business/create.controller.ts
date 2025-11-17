import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BusinessModel, UsersModel } from "../../database/models/index.model";
import mongoose from "mongoose";

export const CreateBusinessController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] });

  try {
    const userId = req.userId;

    // Evitar múltiples negocios por usuario
    const existing = await BusinessModel.findOne({ owner: userId });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Ya tienes un negocio creado.",
      });
    }

    // Normalización final
    req.body.openDays = req.body.openDays.map((d: string) => d.trim().toLowerCase());

    // ----- TRANSACCIÓN -----
    const session = await mongoose.startSession();
    session.startTransaction();

    const business = await BusinessModel.create(
      [{ ...req.body, owner: userId }],
      { session }
    );

    await UsersModel.findByIdAndUpdate(
      userId,
      { business: business[0]._id },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Negocio creado correctamente.",
      business: business[0],
      success: true,
      error: false,
    });

  } catch (error) {
    console.error("Error creating business:", error);
    return next(error);
  }
};
