import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { handleError } from "../../helpers/handleErrors";
import { createAccessToken, createRefreshToken } from "../../helpers/jsonwebtoken";
import { UsersModel } from "../../database/models/index.model";
import { redis } from "../../database/redis";

export const SignupController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0], error: true, success: false });
  const { userName, userEmail, userPhone, password } = req.body;
  try {
    const user = await UsersModel.create({
      name: userName,
      email: userEmail,
      phone: userPhone,
      password
    });
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id)

    const ttlSeconds = 7 * 24 * 60 * 60;
    await redis.set(`refresh:${user!._id}`, refreshToken, "EX", ttlSeconds);
    return res.status(201).json({ success: true, message: "Usuario creados correctamente", accessToken, refreshToken, user });
  } catch (error) {
    return handleError(res, error, "Error al registrar usuario");
  }
}