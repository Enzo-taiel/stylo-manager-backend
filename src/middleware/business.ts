import { Request, Response, NextFunction } from 'express'

// CONFIG
import { BUSINESS } from '../config/variables'

const errorResponseBusinessMissing = {
  error: true,
  message: 'Missing business name.'
}

const HandleBusiness = (req: Request, res: Response, next: NextFunction) => {
  next()
  // const businessName = req.headers['x-app-business'] as string
  // const thereBusiness = Boolean(businessName)
  // const validName = BUSINESS.includes(businessName)

  // // Please note that requests with a modifier 
  // // identifier may be received by the customer, 
  // // please try to take more steps.

  // if (!thereBusiness && !validName) return res.status(403).json(errorResponseBusinessMissing)
  // req.businessName = businessName
  // next()
}

export default HandleBusiness