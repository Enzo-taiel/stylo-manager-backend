import { Request, Response } from "express";
import { ServicesModel } from "../../database/models/index.model";

export const DeleteServiceController = async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId
  try {
    await ServicesModel.findOneAndDelete({ _id: serviceId })
    return res.status(200).json({ message: "Service delete successfully.", success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: true })
  }
}