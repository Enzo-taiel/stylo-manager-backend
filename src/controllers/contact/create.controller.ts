import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ContactModel } from "../../database/models/index.models";

export const CreateMessageContactController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0], success: false, error: true, message: "error in key value" });
  try {
    const message = await ContactModel.create(req.body)
    // ANTES DE TERMINAR LA CONSULTA, AGREGAR LA LOGICA PARA RESPONDER EL MENSAJE MEDIANTE
    // WHATSAPP BUSSINES PARA PONERSE EN CONTACTO CON EL CLIENTE
    return res.status(200).json({ message: "message saved successfully.", success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: true})
  }
}