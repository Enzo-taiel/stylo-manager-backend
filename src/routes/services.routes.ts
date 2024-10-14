import { Router } from 'express'
// CONTROLLERS
import { ObtainAllServicesController, CreateServiceController } from '../controllers/services'
import ServicesValidateFieldsMiddleware from '../middleware/services/createServiceMiddleware'

const routerServices = Router()

routerServices.get("/all", ObtainAllServicesController)
routerServices.post("/create", ServicesValidateFieldsMiddleware, CreateServiceController)

export default routerServices