import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ContactModel } from "../../database/models/index.model";

export const CreateMessageContactController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] })

  const sessionId = req.sessionId
  try {
    const message = await ContactModel.create({ ...req.body, sessionId })
    // ANTES DE TERMINAR LA CONSULTA, AGREGAR LA LOGICA PARA RESPONDER EL MENSAJE MEDIANTE
    // WHATSAPP BUSSINES PARA PONERSE EN CONTACTO CON EL CLIENTE
    return res.status(200).json({ message: "message saved successfully.", success: true, error: false })
  } catch (error) {
    return next(error)
  }
}