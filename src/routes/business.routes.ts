import { Router } from 'express';
import { CreateBusinessController } from '../controllers/business/create.controller';
import { ObtainBusinessByIdController } from '../controllers/business/obtain.controller';

import HandleAutentification from '../middleware/authentification';
import validateFieldsInsertBussine from '../middleware/business/createBusinessMiddleware';

const routerBusiness = Router()

routerBusiness.get("/obtain/:businessId", HandleAutentification, ObtainBusinessByIdController)
routerBusiness.post("/create", HandleAutentification, validateFieldsInsertBussine, CreateBusinessController)

export default routerBusiness