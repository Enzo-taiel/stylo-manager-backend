import { Request, Response } from 'express'
// INTERFACE DATABASE
import { IEmployee } from '../../database/interface'
// DATABASE
import { EmployeeModel } from '../../database/models/index.models'

export const ObtainAllEmployeesController = async (_req: Request, res: Response) => {

  try {
    const Employees: IEmployee[] = await EmployeeModel.find()
    return res.status(200).json({ message: "Employees obtain successfully.", Employees })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}