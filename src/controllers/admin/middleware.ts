import { Request, Response, NextFunction } from 'express'

export const StableshShirtInBody = (req: Request, _res: Response, next: NextFunction) => {
  req.body.product = "shirt"
  next()
}

export const StableshJacketInBody = (req: Request, _res: Response, next: NextFunction) => {
  req.body.product = "jacket"
  next()
}

export const StableshPantInBody = (req: Request, _res: Response, next: NextFunction) => {
  req.body.product = "pant"
  next()
}

export const StableshSweatshirtInBody = (req: Request, _res: Response, next: NextFunction) => {
  req.body.product = "sweatshirt"
  next()
}