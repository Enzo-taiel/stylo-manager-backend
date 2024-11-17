import { Router } from 'express'
// CONTROLLERS
import { CreatePushNotificationController } from '../controllers/notifications'

const routerNotification = Router()

routerNotification.post("/send", CreatePushNotificationController)

export default routerNotification