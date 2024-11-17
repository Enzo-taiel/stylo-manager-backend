import { Router } from 'express'
// CONTROLLERS
import { getAllAppointments, getAppointementById} from '../controllers/appointments'
// MIDDLEWARE

const routerAppointments = Router()
routerAppointments.get("/all", getAllAppointments)
routerAppointments.get("/:appointmentId", getAppointementById)

export default routerAppointments