import { Request, Response } from "express";
import { SalesModel } from "../../database/models/index.model";

export const DeleteSalesController = async (req: Request, res: Response) => {
  const { saleId } = req.params
  try {
    await SalesModel.deleteOne({ _id: saleId })
    return res.status(200).json({ message: "Sale delete successfully.", success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: true, error: false })
  }
}