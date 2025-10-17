import WebPush from "web-push";
import { Request, Response } from "express";
import { ClientsModel, SessionsModel } from "../../database/models/index.model";

export const subscriptionCreateController = async (req: Request, res: Response) => {
  const sessionId = req.sessionId
  const subscription = req.body.subscription
  try {
    await SessionsModel.findOneAndUpdate({ sessionId }, { subscription })
    return res.status(200).json({ message: "Sessions update successfully.", error: false, success: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: false })
  }
}

export const CreatePushNotificationController = async (req: Request, res: Response) => {
  const { phone } = req.body
  try {
    const client = await ClientsModel.findOne({ phone })
    const subscription = client!.subscription
    await WebPush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.keys.auth,
          p256dh: subscription.keys.p256dh
        }
      },
      JSON.stringify({
        title: '⏰ Recordatorio de tu reserva',
        body: `👋 ¡Hola ${client!.full_name.split(" ")[0]}!, Tu reserva está cerca.\n ¡Te esperamos pronto en Club Stylo! ✨`,
      })
    )
    return res.status(200).json({ message: "Notification send successfully.", error: false, succes: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}