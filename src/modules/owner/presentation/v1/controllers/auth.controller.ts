import { AuthMapper } from "../mappers/auth.mapper";
import { NextFunction, Request, Response } from "express";
import { AuthCase } from "@/modules/owner/application/auth/auth.case";

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = AuthMapper.normalizeSignin(req.body)
    const signinData = await AuthCase.signin(dto.credential, dto.password)
    const response = AuthMapper.toResponseSignin(signinData)
    return res.status(200).json({
      message: "User signin successfully.",
      success: true,
      ...response
    })
  } catch (error) {
    return next(error)
  }
}

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = AuthMapper.normalizeSignup(req.body)
    const signupData = await AuthCase.createUser(userData)
    const response = AuthMapper.toResponseSignup(signupData)
    return res.status(201).json({
      message: "User created successfully.",
      success: true,
      ...response
    })
  } catch (error) {
    return next(error)
  }
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId!
  const token = req.token
  try {
    await AuthCase.signOut(token, userId)
    return res.status(200).json({
      success: true,
      error: false,
      message: "Session successfully closed."
    })
  } catch (error) {
    return next(error)
  }
}

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body
  try {
    const accessToken = await AuthCase.createAccessTokenByRefreshToken(refreshToken)
    return res.status(200).json({
      success: true,
      error: false,
      message: "Access token refreshed successfully.",
      accessToken
    });
  } catch (error) {
    return next(error)
  }
}