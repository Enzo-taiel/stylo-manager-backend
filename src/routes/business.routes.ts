import { Router } from 'express';
import { CreateBusinessController, ObtainAllBusinessController, 
  ObtainBusinessByIdController, ObtainBusinessBySubdomainController
} from '../controllers/business/';

import HandleAutentification from '../middleware/authentification';
import validateFieldsInsertBussine from '../middleware/business/createBusinessMiddleware';

const routerBusiness = Router()

routerBusiness.get("/obtain/by-subdomain/:subdomain", HandleAutentification, ObtainBusinessByIdController)

// routes used in expo app
routerBusiness.get("/obtain/:businessId", HandleAutentification, ObtainBusinessBySubdomainController)
routerBusiness.post("/create", HandleAutentification, validateFieldsInsertBussine, CreateBusinessController)

export default routerBusiness