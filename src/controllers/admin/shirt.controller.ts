import { Request, Response } from 'express'

// INTERFACE
import { PostClothe } from './interface'

// MODEL DATABASE
import { ClothesSchema } from '../../database/schemas'

export const PostShirtController = async (req: Request, res: Response) => {
  const clotheModel = req.dbClient.model('clothes', ClothesSchema)

  try {
    const body = req.body as PostClothe
    const { brand, model, price, unit } = body
    if (!brand) return res.status(400).json({ error: true, message: "Enter your product brand." })
    if (!model) return res.status(400).json({ error: true, message: "Enter your product model." })
    if (!price) return res.status(400).json({ error: true, message: "Enter your product price." })
    if (!unit) return res.status(400).json({ error: true, message: "Enter the unit number." })

    const new_clothes = await clotheModel.create(body)
    return res.status(200).json({ success: true, message: "Clothe save successfully.", clothe: new_clothes })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: true, message: "Error internal Server." })
  }
}
