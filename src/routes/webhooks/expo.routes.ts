import { Router } from 'express'
import { handleExpoTokenPushNotifications } from '../../controllers/webhooks'

const routerExpoWebHook = Router()
routerExpoWebHook.get("/expo/:expoPushToken", handleExpoTokenPushNotifications )

export default routerExpoWebHook