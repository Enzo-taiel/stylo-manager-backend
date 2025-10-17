import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { ClientsModel } from "../../database/models/index.model";

export const createClientController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0], error: true, success: false});
  const { clientName, clientPhone } = req.body
  const sessionId = req.sessionId
  const alreadyExistClient = await ClientsModel.findOne({ phone: clientPhone, sessionId })
  if (alreadyExistClient) return res.status(200).json({ message: "client already registered.", success: false, error: true })
  try {
    await ClientsModel.create({
      name: clientName,
      phone: clientPhone,
      sessionId
    })
    return res.status(200).json({ message: "client create successfully.", success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: true })
  }
}