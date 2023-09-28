import { Router } from 'express'

// CONTROLLERS
import { SigninController } from '../controllers/auth.controller'


const routerAuth = Router()

routerAuth.post("/signin", SigninController)

export default routerAuth