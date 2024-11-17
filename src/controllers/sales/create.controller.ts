import { Request, Response } from 'express'
// DATABASE
import { SalesModel } from '../../database/models/index.models'

export const CreateSalesController = async (req: Request, res: Response) => {
  try {
    const newSale = await SalesModel.create(req.body)
    const sale = await SalesModel.findById(newSale._id)
    .populate("employee", "full_name")
    .populate("service", "title price")
    return res.status(200).json({ message: "Sale saved successfully.", success: true, sale })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}