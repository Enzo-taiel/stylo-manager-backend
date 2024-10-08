import { Router } from 'express'
// CONTROLLERS
import { SigninController, SignupController } from '../controllers/auth'
// MIDDLEWARE
import SigninValidateFieldsMiddleware from '../middleware/auth/signinMiddleware'
import SignupValidateFieldsMiddleware from '../middleware/auth/singupMiddleware'

const routerAuth = Router()
routerAuth.post("/signin", SigninValidateFieldsMiddleware, SigninController)
routerAuth.post("/signup", SignupValidateFieldsMiddleware, SignupController)

export default routerAuth