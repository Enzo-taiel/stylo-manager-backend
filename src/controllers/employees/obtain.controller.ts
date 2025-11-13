import mongoose from "mongoose"
import { Request, Response } from "express";
import { EmployeesModel } from "../../database/models/index.model";

export const ObtainAllEmployeesController = async (req: Request, res: Response) => {
  const business = req.businessId
  try {
    const employees = await EmployeesModel.find({ business }).populate("appointments")
    return res.status(200).json({ message: "Employees obtain successfully.", employees, success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}

export const ObtainEmployeeByIdController = async (req: Request, res: Response) => {
  const employeeId: string = req.params.employeeId
  const isObjectId = mongoose.Types.ObjectId.isValid(employeeId)

  if(!isObjectId) return res.status(404).json({ message: "Employee not already exist..", error: true, success: false })

  try {
    const employee = await EmployeesModel.findById(employeeId)
      .populate({
        path: "appointments",
        populate: [
          {
            path: "service",
            select: "title duration price",
          },
          {
            path: "employee",
            select: "avatar_url full_name",
          },
          {
            path: "client",
            select: "full_name subscription",
          }
        ],
      })
    if (!employee) return res.status(404).json({ message: "Employee not already exist..", employee, error: true, success: false })
    return res.status(200).json({ message: "Employee obtain successfully.", employee, error: false, success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}

