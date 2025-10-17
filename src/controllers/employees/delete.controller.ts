import { Request, Response } from "express";
import { EmployeesModel } from "../../database/models/index.model";

export const DeleteEmployeeController = async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId
  try {
    await EmployeesModel.findOneAndDelete({ _id: employeeId })
    return res.status(200).json({ message: "Employee delete successfully.", success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: true })
  }
}