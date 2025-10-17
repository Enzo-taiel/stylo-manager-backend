import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { createToken } from "../../helpers/jsonwebtoken";
import { UsersModel } from "../../database/models/index.model";

export const SigninController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0], error: true, success: false });
  const { username } = req.body;
  try {
    const user = await UsersModel.findOne({ username })
    if(!user) return  res.status(400).json({ message: "user not exist", error: true, success: false });
    const token = createToken(user._id)
    return res.status(200).json({ message: "Login successfully.", user, token, error: false, success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}