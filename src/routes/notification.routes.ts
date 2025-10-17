import { Router } from "express";
import { CreatePushNotificationController, subscriptionCreateController } from "../controllers/notifications";

const routerNotification = Router()

routerNotification.post("/send", CreatePushNotificationController)
routerNotification.put("/subscription/create", subscriptionCreateController)

export default routerNotification