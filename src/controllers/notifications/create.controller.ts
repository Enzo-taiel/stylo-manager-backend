import { Request, Response } from 'express'
import WebPush from 'web-push'
import { ClientsModel } from '../../database/models/index.models'

export const CreatePushNotificationController = async (req: Request, res: Response) => {

  const { phone }: { phone: string } = req.body

  try {

    const client = await ClientsModel.findOne({ phone }).lean()
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
        body: `👋 ¡Hola ${client!.full_name.split(" ")[0]}!
         Tu reserva está cerca. ¡Te esperamos pronto en Club Stylo! ✨`,
      })
    )

    return res.status(200).json({ message: "Notification send successfully." })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}