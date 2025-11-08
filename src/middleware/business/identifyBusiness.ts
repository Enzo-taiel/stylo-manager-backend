import { BusinessModel } from "../../database/models/index.model";
import { Request, Response, NextFunction } from "express";
import HandleAutentification from "../authentification";

export const identifyBusinessWebOnly = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userAgent = req.headers["user-agent"] || "";
    const businessId = req.header("x-business-id");

    if (/okhttp|android|iphone|mobile/i.test(userAgent) || !businessId) {
     return HandleAutentification(req, res, next)
    }

    // 🧩 Si viene del panel web, validamos el negocio
    const business = await BusinessModel.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business no encontrado" });
    }

    req.businessId = business._id;
    next();
  } catch (error) {
    console.error("Error en identifyBusinessWebOnly:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
