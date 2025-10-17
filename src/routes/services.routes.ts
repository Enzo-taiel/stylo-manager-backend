import { Router } from 'express'
import { DeleteServiceController } from '../controllers/services/delete.controller';
import ServicesValidateFieldsMiddleware from '../middleware/services/createServiceMiddleware';
import { ObtainAllServicesController, CreateServiceController, ObtanTopServicesByEmployee } from '../controllers/services';

const routerServices = Router()

routerServices.get("/obtain/all", ObtainAllServicesController)
routerServices.get("/top-services/:employeeId", ObtanTopServicesByEmployee)

routerServices.post("/create", ServicesValidateFieldsMiddleware, CreateServiceController)
routerServices.delete("/delete/:serviceId", DeleteServiceController)

export default routerServices