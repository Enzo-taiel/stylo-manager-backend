import { Router } from 'express'
// CONTROLLERS
import { createClientController } from '../controllers/clients/create.controller'
import validateFieldsInsertClient from '../middleware/clients/createClientMiddleware'
import { getClientController } from '../controllers/clients/obtain.controller'

const routerClients = Router()

routerClients.get("/all", getClientController)
routerClients.post("/create", validateFieldsInsertClient, createClientController)

export default routerClients