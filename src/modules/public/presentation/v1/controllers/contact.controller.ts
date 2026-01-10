import { PublicContactService } from "@/modules/public/application/contact.service";
import { Request, Response, NextFunction } from "express";

export const CreateContactController = async (req: Request, res: Response, next: NextFunction) => {

  const sessionId = req.sessionId
  try {
    const contact = await PublicContactService.createContact({ ...req.body, session: sessionId })
    // ANTES DE TERMINAR LA CONSULTA, AGREGAR LA LOGICA PARA RESPONDER EL MENSAJE MEDIANTE
    // WHATSAPP BUSSINES PARA PONERSE EN CONTACTO CON EL CLIENTE
    return res.status(200).json({ message: "message saved successfully.", success: true, error: false })
  } catch (error) {
    return next(error)
  }
}