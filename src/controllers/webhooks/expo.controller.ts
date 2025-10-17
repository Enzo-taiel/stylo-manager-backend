import { Request, Response } from 'express'
import { EmployeesModel } from '../../database/models/index.model'

export const handleExpoTokenPushNotifications = async (req: Request, res: Response) => {

  const expoPushToken = req.params.expoPushToken

  try {
    await EmployeesModel.updateMany({}, { $set: { expoPushToken } })
    return res.status(200).json({ message: "Expo token saved successfully.", })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}