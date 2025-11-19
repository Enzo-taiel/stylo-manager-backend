import { Router } from 'express'
import { validateFieldsCreateService } from '../middleware/services/createServiceMiddleware';
import { validateFieldsUpdateService } from '../middleware/services/updateServiceMiddleware';
import { 
  ObtainAllServicesController, CreateServiceController, 
  ObtanTopServicesByEmployee, ObtainServiceByIdController,
  UpdateServiceController, DeleteServiceController
} from '../controllers/services';
import { identifyBusinessWebOnly } from '../middleware/business/identifyBusiness';
import HandleAutentification from '../middleware/authentification';

const routerServices = Router()

routerServices.get("/obtain/all", identifyBusinessWebOnly, ObtainAllServicesController)
routerServices.get("/obtain/:serviceId", identifyBusinessWebOnly, ObtainServiceByIdController)

routerServices.get("/top-services/:employeeId", ObtanTopServicesByEmployee)

routerServices.post("/create", validateFieldsCreateService, HandleAutentification, CreateServiceController)
routerServices.delete("/delete/:serviceId", HandleAutentification, DeleteServiceController)
routerServices.put("/update/:serviceId", validateFieldsUpdateService, HandleAutentification, UpdateServiceController)

export default routerServices