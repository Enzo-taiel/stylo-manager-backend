import { Router } from 'express'
// CONTROLLERS
import { CreateMessageContactController, getAllMessages, getAllMessageByPhone } from '../controllers/contact'
import ContactMessageValidateFieldsMiddleware from '../middleware/contact/createMessageContactMiddleware'

const routerContact = Router()

routerContact.get("/all", getAllMessages)
routerContact.get("/message/:phone", getAllMessageByPhone)
routerContact.post("/message", ContactMessageValidateFieldsMiddleware, CreateMessageContactController)

export default routerContact