import { redis } from "../../database/redis";
import { decodeToken, verifyTokenType } from "../../helpers/jsonwebtoken";
import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
  try {
    const token = req.token;
    if (!token) return res.status(400).json({ message: "Token no encontrado" });

    const decoded = decodeToken(token);
    verifyTokenType(decoded, "access");
    const exp = decoded?.exp;
    if (!exp) return res.status(400).json({ message: "Token inválido" });

    const ttl = exp - Math.floor(Date.now() / 1000);
    await redis.set(`bl:${token}`, "revoked", "EX", ttl);
    await redis.del(`refresh:${req.userId}`);
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error al cerrar sesión" });
  }
};