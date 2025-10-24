import { Router } from 'express'
// CONTROLLERS
import { SigninController, SignupController, ObtainMeController, logoutController, RefreshTokenController } from '../controllers/auth'
// MIDDLEWARE
import SigninValidateFieldsMiddleware from '../middleware/auth/signinMiddleware'
import SignupValidateFieldsMiddleware from '../middleware/auth/singupMiddleware'
import HandleAutentification from '../middleware/authentification'

const routerAuth = Router()
routerAuth.post("/signin", SigninValidateFieldsMiddleware, SigninController)
routerAuth.post("/signup", SignupValidateFieldsMiddleware, SignupController)
routerAuth.post("/refresh", RefreshTokenController)
routerAuth.get("/me", HandleAutentification, ObtainMeController)
routerAuth.get("/logout", HandleAutentification, logoutController)

export default routerAuth