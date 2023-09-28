import { Request, Response } from 'express'

export const SigninController = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if(!username) return res.status(402).json({error: true, message: ""})
  if(!password) return res.status(402).json({error: true, message: ""})


  return res.end("end")
}