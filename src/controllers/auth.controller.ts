import { Request, Response } from 'express'
// INTERFACE CONTROLLERS
import { RequestSignup, RequestSignin } from './interface'
// INTERFACE DATABASE
import { IUser } from '../database/interface'
// DATABASE
import UserModel from '../database/models/users.model'
// HELPERS
import { isMatchPassword } from '../helpers/jsonwebtoken'

export const SigninController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as RequestSignin;
    if (!username) return res.status(400).json({ error: true, message: "Insert your username." })
    if (!password) return res.status(400).json({ error: true, message: "Insert yout password." })
    const User: IUser | null = await UserModel.findOne({ username })
    if (!User) return res.status(400).json({ error: true, message: "Username do not exist." })
    const isMatch = await isMatchPassword(password, User.password)
    if (!isMatch) return res.status(400).json({ error: true, message: "Password incorrect." })
    return res.status(200).json({ success: true, message: "Login successfully.", data: User })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: true, message: "Error internal Server." })
  }
}

export const SignupController = async (req: Request, res: Response) => {
  try {
    const { name, last_name, username, password, email, password_repiter } = req.body as RequestSignup;
    if (!name) return res.status(400).json({ error: true, message: "Insert your name." })
    if (!email) return res.status(400).json({ error: true, message: "Insert your email." })
    if (!username) return res.status(400).json({ error: true, message: "Insert your username." })
    if (!password) return res.status(400).json({ error: true, message: "Insert your password." })
    if (!last_name) return res.status(400).json({ error: true, message: "Insert your lastname." })
    if (!password_repiter) return res.status(400).json({ error: true, message: "Repit your password." })

    const exist_username: IUser | null = await UserModel.findOne({ username })
    const exist_email: IUser | null = await UserModel.findOne({ email })
    if (exist_username) return res.status(400).json({ error: true, message: "Your username already exist." })
    if (exist_email) return res.status(400).json({ error: true, message: "Your email already exist." })

    const User = await UserModel.create(req.body)
    return res.status(200).json({ success: true, message: "User register successfully.", data: User })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: true, message: "Error internal Server." })
  }
}