import { Router } from "express";
import ContactMessageValidateFieldsMiddleware from "../middleware/contact/createMessageContactMiddleware";
import { CreateMessageContactController, getAllMessages, getAllMessageByPhone } from "../controllers/contact";

const routerContact = Router()

routerContact.get("/obtain/all", getAllMessages)
routerContact.get("/obtain/message/:phone", getAllMessageByPhone)
routerContact.post("/message/create", ContactMessageValidateFieldsMiddleware, CreateMessageContactController)

export default routerContact