import { Router } from 'express'
// CONTROLLERS
import { ObtainAllEmployeesController } from '../controllers/employees'

const routerServices = Router()

routerServices.get("/all", ObtainAllEmployeesController)

export default routerServices