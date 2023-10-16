import { Router } from 'express'
// CONTROLLERS
import { SigninController, SignupController } from '../controllers/auth.controller'

const routerAuth = Router()
routerAuth.post("/signin", SigninController)
routerAuth.post("/signup", SignupController)

export default routerAuth