import { validationResult } from "express-validator";
import { ClientsModel } from "../../database/models/index.models";
import { Response, Request } from "express"

export const createClientController = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0] });

  const { clientName, clientPhone } = req.body
  const sessionId = req.sessionId

  const alreadyExistClient = await ClientsModel.findOne({ phone: clientPhone, sessionId })
  if (alreadyExistClient) return res.status(200).json({ message: "client already registered.", success: true, error: false })

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