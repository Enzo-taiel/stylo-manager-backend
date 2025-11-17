import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";
import { createAccessToken, createRefreshToken } from "../../helpers/jsonwebtoken";
import { UsersModel, BusinessModel } from "../../database/models/index.model";
import { redis } from "../../database/redis";

export const SigninController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] })
  try {
    const { credential } = req.body;
    const user = await UsersModel.findOne(
      {
        $or: [{ email: credential }, { phone: credential }]
      }).select("-password -__v -createdAt -updatedAt");

    const business = await BusinessModel.findOne({ owner: user!._id });
    const accessToken = createAccessToken(user!._id);
    const refreshToken = createRefreshToken(user!._id);

    // Guardar el refresh token en Redis con TTL (por ejemplo, 7 días)
    const ttlSeconds = 7 * 24 * 60 * 60;
    await redis.set(`refresh:${user!._id}`, refreshToken, "EX", ttlSeconds);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Sesión iniciada correctamente.",
      user,
      business: business ?? null,
      accessToken,
      refreshToken
    })
  } catch (error) {
    return next(error)
  }
}