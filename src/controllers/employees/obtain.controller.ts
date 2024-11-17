import { Request, Response } from 'express'
// INTERFACE DATABASE
import { IEmployee } from '../../database/interface'
// DATABASE
import { EmployeesModel } from '../../database/models/index.models'

export const ObtainAllEmployeesController = async (_req: Request, res: Response) => {
  try {
    const employees: IEmployee[] = await EmployeesModel.find()
    return res.status(200).json({ message: "Employees obtain successfully.", employees })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const ObtainEmployeeByIdController = async (req: Request, res: Response) => {

  const employeeId: string = req.params.employeeId
  try {
    const employee: IEmployee | null = await EmployeesModel.findById(employeeId)
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
            select: "full_name",
          }
        ],
      })
    if (!employee) return res.status(404).json({ message: "Employee not already exist..", employee })
    return res.status(200).json({ message: "Employee obtain successfully.", employee })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

