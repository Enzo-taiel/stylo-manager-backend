import { Request, Response } from "express"
import { ClientsModel } from "../../database/models/index.models"

export const getClientController = async (req: Request, res: Response) => {
  const sessionId = req.sessionId
  try {
    const clients = await ClientsModel.find({ sessionId })
    return res.status(200).json({ message: "clients obtain successfully", clients, success: true, error: false })
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los mensajes" });
  }

}