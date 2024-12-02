import { Request, Response } from 'express'
import { ContactModel } from '../../database/models/index.models'

export const getAllMessages = async (_req: Request, res: Response) => {

  try {
    const messages = await ContactModel.find({}, { phone: 1, full_name: 1, messages: { $slice: -1 } });
    return res.status(200).json({ message: "Messages obtain successfully.", messages })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const getAllMessageByPhone = async (req: Request, res: Response) => {

  try {
    const { phone } = req.params;
    const messages = await ContactModel.findOne({ phone });
    if (!messages) return res.status(404).json({ error: "Contacto no encontrado" });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los mensajes" });
  }
}