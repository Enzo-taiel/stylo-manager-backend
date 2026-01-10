import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "@/core/auth/infrastructure/auth.repository";
import { ServiceRepository } from "@/core/service/infrastructure/service.repository";

export const handleAuthentication = async (req: Request, _res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization as string;

  const accessToken = authHeader.split(" ")[1]
  
  if (!accessToken) {
    return next({
      httpStatus: 401,
      code: "NO_TOKEN",
      message: "no token provider."
    })
  }

  try {
    const isBlacklisted = await AuthRepository.verifyAccessTokenIsBlackList(accessToken)
    if (isBlacklisted) {
      return next({
        httpStatus: 401,
        code: "TOKEN_REVOKED",
        message: "Token revoked."
      })
    }

    const decoded = AuthRepository.validAccessToken(accessToken);

    const user = await AuthRepository.findById(decoded._id)
    if (!user) {
      return next({
        httpStatus: 401,
        code: "INVALID_USER",
        message: "Token invalid."
      })
    }

    const business = await ServiceRepository.findById(user.id!)

    req.userId = user.id!
    req.businessId = business?._id.toString()
    req.token = accessToken

    return next()
  } catch (error: any) {

    if (error.name === "TokenExpiredError") {
      return next({
        httpStatus: 401,
        code: "TOKEN_REVOKED",
        message: "Access token expired.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return next({
        httpStatus: 401,
        code: "INVALID_TOKEN",
        message: "Invalid access token.",
      });
    }

    return next(error)
  }

}