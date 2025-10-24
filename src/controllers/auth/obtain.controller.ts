import { Request, Response } from "express"
import { UsersModel, BussinesModel } from "../../database/models/index.model";
import { handleError } from "../../helpers/handleErrors";

export const ObtainMeController = async (req: Request, res: Response) => {
  const userId = req.userId
  try {
    const user = await UsersModel.findById(userId).select("-password -__v -createdAt -updatedAt");
    const bussines = await BussinesModel.findOne({ owner: user!._id });
    return res.status(200).json({ message: "Datos del usuario obtenidos correctamente.", user, bussines, error: false, success: true })
  } catch (error) {
    return handleError(res, error, "Error al iniciar sesion.");
  }
}