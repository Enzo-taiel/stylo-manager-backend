import { Request, Response } from 'express'
// INTERFACE DATABASE
import { IServices } from '../../database/interface'
// DATABASE
import { ServicesModel } from '../../database/models/index.models'

export const ObtainAllServicesController = async (_req: Request, res: Response) => {

  try {
    const Employees: IServices[] = await ServicesModel.find()
    return res.status(200).json({ message: "Employees obtain successfully.", Employees })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}