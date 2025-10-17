import { Request, Response, NextFunction } from 'express'
// MODELS
import { decodingToken } from '../helpers/jsonwebtoken'
import { UsersModel } from '../database/models/index.model'
import { IUser } from '../database/interface'

const HandleAuthorizationDashboard = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers["authorization"]?.split(' ')[1]
  if (!token) res.status(401).send("You are not authorized to make this enquiry.")
  const { _id } = decodingToken(token!)

  const userAdmin: IUser | null = await UsersModel.findOne({ _id })
  if(!userAdmin) res.status(401).send("You are not authorized to make this enquiry.")
  req.userAdmin = userAdmin
  next()
}

export default HandleAuthorizationDashboard