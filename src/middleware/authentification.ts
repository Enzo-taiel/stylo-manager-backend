import { Request, Response, NextFunction } from 'express'
import { decodeToken, verifyTokenType } from '../helpers/jsonwebtoken'
import { redis } from '../database/redis'
import { BusinessModel, UsersModel } from '../database/models/index.model'

const HandleAutentification = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization as string
  const accessToken = authHeader && authHeader.split(" ")[1]
  if (!accessToken) return res.status(401).send("You are not authorized to make this enquiry.")

  const isBlacklisted = await redis.get(`bl:${accessToken}`);
  if (isBlacklisted) return res.status(401).json({ message: "Token revocado" });

  try {
    const decoded = decodeToken(accessToken) as unknown as { _id: string }
    verifyTokenType(decoded, "access");

    const user = await UsersModel.findById(decoded?._id)
    const business = await BusinessModel.findOne({ owner: user?._id})
    if (!user) return res.status(400).json({ message: "invalid token." })
    req.userId = user._id
    req.token = accessToken;
    req.businessId = business?._id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export default HandleAutentification