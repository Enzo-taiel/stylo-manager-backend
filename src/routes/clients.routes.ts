import { Router } from 'express';
import { getClientController } from '../controllers/clients/obtain.controller';
import { createClientController } from '../controllers/clients/create.controller';
import validateFieldsInsertClient from '../middleware/clients/createClientMiddleware';
import HandleAutentification from '../middleware/authentification';

const routerClients = Router()

routerClients.get("/obtain/all", getClientController)
routerClients.post("/create", HandleAutentification, validateFieldsInsertClient, createClientController)

export default routerClients