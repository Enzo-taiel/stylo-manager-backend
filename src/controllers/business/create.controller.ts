import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BusinessModel, UsersModel } from "../../database/models/index.model";

export const CreateBusinessController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ inputError: errors.array()[0], success: false, error: true });
  try {
    const business = await BusinessModel.create({
      ...req.body,
      owner: req.userId
    })

    await UsersModel.findByIdAndUpdate(req.userId, { business: business._id})
    return res.status(200).json({ message: "Negocio creado correctamente.", business, success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error interno del servidor.", success: false, error: true })
  }
}