import { Request, Response, NextFunction } from 'express'
import { decodeToken, verifyTokenType } from '../helpers/jsonwebtoken'
import { redis } from '../database/redis'
import { BusinessModel, UsersModel } from '../database/models/index.model'

const HandleAutentification = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization as string
  const accessToken = authHeader && authHeader.split(" ")[1]
  if (!accessToken) {
    return next({
      httpStatus: 401,
      code: "NO_TOKEN",
      message: "No estás autorizado para realizar esta consulta."
    })
  }


  try {
    const isBlacklisted = await redis.get(`bl:${accessToken}`);
    if (isBlacklisted) {
      return next({
        httpStatus: 401,
        code: "TOKEN_REVOKED",
        message: "Token revocado."
      })
    }

    const decoded = decodeToken(accessToken) as { _id: string }
    verifyTokenType(decoded, "access");

    const user = await UsersModel.findById(decoded?._id)
    if (!user) {
      return next({
        httpStatus: 401,
        code: "INVALID_USER",
        message: "Token inválido."
      })
    }

    const business = await BusinessModel.findOne({ owner: user._id })

    req.userId = user._id
    req.businessId = business?._id
    req.token = accessToken

    return next()
  } catch (err) {
    return next({
      httpStatus: 401,
      code: "INVALID_TOKEN",
      message: "Token inválido."
    })
  }
}

export default HandleAutentification