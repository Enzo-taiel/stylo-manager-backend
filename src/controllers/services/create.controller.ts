import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ServicesModel } from '../../database/models/index.model';

export const CreateServiceController = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ inputError: errors.array()[0], success: false });

  const data = {
    ...req.body,
    business: req.businessId
  }
  try {
    const service = await ServicesModel.create(data)
    return res.status(200).json({ message: "Service created successfully.", service })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}