import { Router } from 'express'
// CONTROLLERS
import { ObtainAllServicesController, CreateServiceController, ObtanTopServicesByEmployee } from '../controllers/services'
import ServicesValidateFieldsMiddleware from '../middleware/services/createServiceMiddleware'

const routerServices = Router()

routerServices.get("/all", ObtainAllServicesController)
routerServices.get("/top-services/:employeeId", ObtanTopServicesByEmployee)

routerServices.post("/create", ServicesValidateFieldsMiddleware, CreateServiceController)

export default routerServices