import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { createAccessToken, createRefreshToken } from "../../helpers/jsonwebtoken";
import { UsersModel, BussinesModel } from "../../database/models/index.model";
import { handleError } from "../../helpers/handleErrors";
import { redis } from "../../database/redis";

export const SigninController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), error: true, success: false });
  const { credential } = req.body;
  try {
    const user = await UsersModel.findOne({ $or: [{ email: credential }, { phone: credential }] })
    const bussines = await BussinesModel.findOne({ owner: user!._id });
    const accessToken = createAccessToken(user!._id);
    const refreshToken = createRefreshToken(user!._id);

    // Guardar el refresh token en Redis con TTL (por ejemplo, 7 días)
    const ttlSeconds = 7 * 24 * 60 * 60;
    await redis.set(`refresh:${user!._id}`, refreshToken, "EX", ttlSeconds);
    return res.status(200).json({ message: "Sesion iniciada.", user, accessToken, refreshToken, bussines, error: false, success: true })
  } catch (error) {
    return handleError(res, error, "Error al iniciar sesion.");
  }
}