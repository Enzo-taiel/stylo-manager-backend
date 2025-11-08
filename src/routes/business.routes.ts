import { Router } from 'express';
import { CreateBusinessController } from '../controllers/business/create.controller';
import HandleAutentification from '../middleware/authentification';
import validateFieldsInsertBussine from '../middleware/business/createBusinessMiddleware';

const routerBusiness = Router()

routerBusiness.post("/create", HandleAutentification, validateFieldsInsertBussine, CreateBusinessController)

export default routerBusiness