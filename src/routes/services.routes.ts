import { Router } from 'express'
import { DeleteServiceController } from '../controllers/services/delete.controller';
import { validateFieldsCreateService } from '../middleware/services/createServiceMiddleware';
import { validateFieldsUpdateService } from '../middleware/services/updateServiceMiddleware';
import { 
  ObtainAllServicesController, CreateServiceController, 
  ObtanTopServicesByEmployee, ObtainServiceByIdController 
} from '../controllers/services';

const routerServices = Router()

routerServices.get("/obtain/all", ObtainAllServicesController)
routerServices.get("/obtain/:serviceId", ObtainServiceByIdController)

routerServices.get("/top-services/:employeeId", ObtanTopServicesByEmployee)

routerServices.post("/create", validateFieldsCreateService, CreateServiceController)
routerServices.delete("/delete/:serviceId", DeleteServiceController)
routerServices.put("/update/:serviceId", validateFieldsUpdateService, DeleteServiceController)

export default routerServices