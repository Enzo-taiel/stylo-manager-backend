import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { EmployeesModel } from "../../database/models/index.models";

export const CreateEmployeeController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0], success: false, error: true });
  try {
    const employee = await EmployeesModel.create(req.body)
    return res.status(200).json({ message: "Employee create successfully.", employee, success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: true })
  }
}