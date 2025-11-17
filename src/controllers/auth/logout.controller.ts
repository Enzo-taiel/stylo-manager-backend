import { redis } from "../../database/redis";
import { decodeToken, verifyTokenType } from "../../helpers/jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId
  const token = req.token;

  try {
    const decoded = decodeToken(token);
    verifyTokenType(decoded, "access");
    
    const exp = decoded.exp!;
    const now = Math.floor(Date.now() / 1000);
    const ttl = Math.max(1, exp - now); // evitamos expiraciónes negativa

    await redis.set(`bl:${token}`, "revoked", "EX", ttl);
    await redis.del(`refresh:${userId}`);
    return res.status(200).json({ success: true, error: false, message: "Sesión cerrada correctamente" });
  } catch (error) {
    return next(error)
  }
};