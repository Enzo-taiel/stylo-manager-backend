import { Request, Response } from "express";
import { SalesModel } from "../../database/models/index.models";

export const ObtainSalesAllController = async (_req: Request, res: Response) => {
  try {
    const sales: any = await SalesModel.find()
    .populate("employee", "full_name avatar_url")
    .populate("service", "title mount createdAt")
    return res.status(200).json({ message: "sales obtain successfully.", sales, success: true, error: false })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}