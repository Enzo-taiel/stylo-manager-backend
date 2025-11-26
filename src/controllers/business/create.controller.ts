import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BusinessModel, UsersModel } from "../../database/models/index.model";
import mongoose from "mongoose";
import { supabase } from "../../helpers/supabase";

export const CreateBusinessController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] });

  // @ts-ignore — Multer agrega los campos dinámicamente
  const favicon = req.files?.favicon?.[0] as Express.Multer.File | undefined;
  const userId = req.userId;

  const parsed = {
    ...req.body,
    owner: userId
  };

  try {

    // Evitar múltiples negocios por usuario
    const existing = await BusinessModel.findOne({ owner: userId });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Ya tienes un negocio creado.",
      });
    }

    if (favicon) {
      const fileName = `favicon/BID${req.businessId}-UID${req.userId}-${favicon.originalname}`;

      const { error } = await supabase.storage
        .from(req.body.category)
        .upload(fileName, favicon.buffer, {
          contentType: favicon.mimetype,
          upsert: true,
        });

      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error al subir la imagen a Supabase.",
          error: error.message,
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from(req.body.category)
        .getPublicUrl(fileName);

      parsed.favicon = publicUrlData.publicUrl;
    }

    // Normalización final
    req.body.openDays = req.body.openDays.map((d: string) => d.trim().toLowerCase());

    // ----- TRANSACCIÓN -----
    const session = await mongoose.startSession();
    session.startTransaction();

    const [business] = await BusinessModel.create([parsed], { session });

    await UsersModel.findByIdAndUpdate(
      userId,
      { business: business._id },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Negocio creado correctamente.",
      business: business,
      success: true,
      error: false,
    });

  } catch (error) {
    console.error("Error creating business:", error);
    return next(error);
  }
};
