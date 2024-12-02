import { Request, Response } from 'express'
// DATABASE
import { SalesModel } from '../../database/models/index.models'

export const DeleteSalesController = async (req: Request, res: Response) => {

  const { saleId } = req.params

  try {
    const saleToDelete = await SalesModel.deleteOne({ _id: saleId })
    return res.status(200).json({ message: "Sale delete successfully.", success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}