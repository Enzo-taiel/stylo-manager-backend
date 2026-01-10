import { UserCase } from "@/modules/owner/application/user/user.case";
import { OwnerUserService } from "@/modules/owner/application/user/user.service";
import { NextFunction, Request, Response } from "express";

export const obtainMeController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId

  try {
    const user = await UserCase.findById(userId!)
    return res.status(200).json({
      message: "User obtain successfully.",
      success: true,
      user
    })
  } catch (error) {
    return next(error)
  }

}

export const updateExpoPushTokenController = async (req: Request, res: Response, next: NextFunction) => {

  const { expoPushToken } = req.body
  const userId = req.userId!

  try {
    const user = await OwnerUserService.updateUser(userId, { expoPushToken })
    return res.status(200).json({
      message: "Expo push token update succesfully.",
      error: false,
      success: true,
      user
    })
  } catch (error) {
    return next(error)
  }
}