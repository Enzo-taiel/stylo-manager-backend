import { Router } from 'express'
// CONTROLLERS
import { CreateMessageContactController } from '../controllers/contact'
import ContactMessageValidateFieldsMiddleware from '../middleware/contact/createMessageContactMiddleware'

const routerContact = Router()

routerContact.post("/message", ContactMessageValidateFieldsMiddleware, CreateMessageContactController)

export default routerContact