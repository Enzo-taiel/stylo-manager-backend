import mongoose from "mongoose"
import { Request, Response, NextFunction } from "express";
import { BusinessModel } from "../../database/models/index.model";

export const ObtainAllBusinessController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await BusinessModel.find()
    return res.status(200).json({ message: "Business obtain successfully.", employees, success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}

export const ObtainBusinessByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const businessId: string = req.params.businessId
  const isObjectId = mongoose.Types.ObjectId.isValid(businessId)

  if(!isObjectId) return res.status(404).json({ message: "Business not already exist..", error: true, success: false })

  try {
    const employee = await BusinessModel.findById(businessId)
    if (!employee) return res.status(404).json({ message: "Business not already exist..", employee, error: true, success: false })
    return res.status(200).json({ message: "Employee obtain successfully.", employee, error: false, success: true })
  } catch (error) {
    return next(error)
  }
}