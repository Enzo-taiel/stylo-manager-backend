import { Request, Response } from "express"
import { handleError } from "../../helpers/handleErrors";
import { createAccessToken, decodeToken, verifyTokenType } from "../../helpers/jsonwebtoken";
import { redis } from "../../database/redis";

export const RefreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = decodeToken(refreshToken);
    verifyTokenType(payload, "refresh");

     const storedToken = await redis.get(`refresh:${payload._id}`);
    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token invalid or revoked" });
    }

    const newAccessToken = createAccessToken(payload._id);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return handleError(res, error, "Error refreshing token.");
  }
}