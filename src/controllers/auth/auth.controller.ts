import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
// INTERFACE DATABASE
import { IUser } from '../../database/interface'
// DATABASE
import { UsersModel } from '../../database/models/index.models'
// HELPERS 
import { createToken } from '../../helpers/jsonwebtoken'

export const SigninController = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0] });

  try {
    const { username } = req.body;
    const User: IUser | null = await UsersModel.findOne({ username })
    const token = createToken(User!._id)
    return res.status(200).json({ message: "Login successfully.", user: User, token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const SignupController = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0] });

  try {
    const user: any = await UsersModel.create(req.body)
    const token = createToken(user._id)
    return res.status(200).json({ message: "User register successfully.", token, user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const GetUserDataController = async (req: Request, res: Response) => {

  try {
    return res.status(200).json({ message: "Successfully obtained user information.", user: req.userAdmin })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}
