import { Request, Response } from 'express'

export const handlePushNotifications = async (req: Request, res: Response) => {

  console.log(req.url)

  return res.status(200).json({ message: "Token de expo guardado con exito.", })

}