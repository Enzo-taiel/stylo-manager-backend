import { Request, Response, NextFunction } from "express"
import { createAccessToken, decodeToken, verifyTokenType } from "../../helpers/jsonwebtoken";
import { redis } from "../../database/redis";

export const RefreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return next({ status: 401, message: "Missing refresh token" });

  try {

    const payload = decodeToken(refreshToken);
    verifyTokenType(payload, "refresh");

    const userId = payload?._id;
    if (!userId) {
      return next({ status: 401, message: "Invalid refresh token payload" });
    }

    // Validar que el refresh token sea el registrado
    const storedToken = await redis.get(`refresh:${userId}`);
    if (!storedToken || storedToken !== refreshToken) {
      return next({ status: 401, message: "Refresh token invalid or revoked" });
    }

    // Emitir nuevo access token
    const newAccessToken = createAccessToken(userId);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Access token refreshed successfully.",
      accessToken: newAccessToken
    });
  } catch (error) {
    return next(error);
  }
}