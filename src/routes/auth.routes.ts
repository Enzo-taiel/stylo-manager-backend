import { Router } from 'express'
// CONTROLLERS
import { SigninController, SignupController, GetUserDataController } from '../controllers/auth'
// MIDDLEWARE
import SigninValidateFieldsMiddleware from '../middleware/auth/signinMiddleware'
import SignupValidateFieldsMiddleware from '../middleware/auth/singupMiddleware'
import HandleAuthorizationDashboard from '../middleware/token'

const routerAuth = Router()
routerAuth.post("/signin", SigninValidateFieldsMiddleware, SigninController)
routerAuth.post("/signup", SignupValidateFieldsMiddleware, SignupController)
routerAuth.get("/user", HandleAuthorizationDashboard, GetUserDataController)

export default routerAuth