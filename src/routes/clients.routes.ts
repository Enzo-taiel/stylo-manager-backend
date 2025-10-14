import { Router } from 'express';
import { getClientController } from '../controllers/clients/obtain.controller';
import { createClientController } from '../controllers/clients/create.controller';
import validateFieldsInsertClient from '../middleware/clients/createClientMiddleware';

const routerClients = Router()

routerClients.get("/obtain/all", getClientController)
routerClients.post("/create", validateFieldsInsertClient, createClientController)

export default routerClients