import { Router } from "express";
import { CreatePushNotificationController, subscriptionCreateController, CreateExpoNotification } from "../controllers/notifications";
import HandleAutentification from "../middleware/authentification";

const routerNotification = Router()

routerNotification.post("/send", CreatePushNotificationController)
routerNotification.put("/subscription/create", subscriptionCreateController)

// rutas solamente consumidas por react-native
routerNotification.patch("/expo/subscription/create", HandleAutentification, CreateExpoNotification)

export default routerNotification