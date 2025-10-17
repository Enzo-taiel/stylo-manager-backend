import { Request, Response } from "express";
import { ContactModel } from "../../database/models/index.model";

export const getAllMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await ContactModel.find({}, { phone: 1, full_name: 1, messages: { $slice: -1 } });
    return res.status(200).json({ message: "Messages obtain successfully.", messages, success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}

export const getAllMessageByPhone = async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;
    const messages = await ContactModel.findOne({ phone });
    if (!messages) return res.status(404).json({ message: "Contacto no encontrado", error: true, success: false });
    return res.status(200).json({ messages, message: "Messages obtain successfully", success: true, error: false });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los mensajes", success: false, error: true });
  }
}