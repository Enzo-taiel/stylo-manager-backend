import { PublicSessionService } from "@/modules/public/application/session.service";
import { NextFunction, Request, Response } from "express";

export const updateSubscriptionController = async (req: Request, res: Response, next: NextFunction) => {
  
  // const { sessionId } = req.params
  // const { subscription } = req.body
  
  // try {
  //   const session = await .updateSession(sessionId, { subscription })
  //   return res.status(200).json({
  //     message: "Update subcription successfully.",
  //     error: false,
  //     success: true,
  //     session
  //   })
  // } catch (error) {
  //   return next(error)
  // }
}