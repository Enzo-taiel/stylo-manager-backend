import { PublicClientService } from "@/modules/public/application/client.service";
import { NextFunction, Request, Response } from "express";

export const updateSubscriptionController = async (req: Request, res: Response, next: NextFunction) => {

  const { subscription } = req.body
  const sessionId = req.sessionId

  try {
    await PublicClientService.updateClient(sessionId, { subscription })
    return res.status(200).json({
      message: "Client subscripted successfully.",
      error: false,
      success: true
    })
  } catch (error) {
    return next(error)
  }
}