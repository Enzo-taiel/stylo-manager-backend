import { Request, Response, NextFunction } from "express";
import { ContactModel } from "../../database/models/index.model";

export const getAllMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await ContactModel.find({}, { phone: 1, full_name: 1, messages: { $slice: -1 } });
    return res.status(200).json({ message: "Messages obtain successfully.", messages, success: true, error: false })
  } catch (error) {
    return next(error)
  }
}

export const getAllMessageByPhone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.params;
    const messages = await ContactModel.findOne({ phone });
    if (!messages) return next({ status: 404, message: "Contact not found."})
    return res.status(200).json({ messages, message: "Messages obtain successfully", success: true, error: false });
  } catch (error) {
    return next(error)
  }
}