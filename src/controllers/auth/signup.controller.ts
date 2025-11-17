import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createAccessToken, createRefreshToken } from "../../helpers/jsonwebtoken";
import { UsersModel } from "../../database/models/index.model";
import { redis } from "../../database/redis";

export const SignupController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] });
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
    return next(error);
  }
}