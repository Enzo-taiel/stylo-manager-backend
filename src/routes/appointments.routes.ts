import { Router } from 'express'
// CONTROLLERS
import {
  getAllAppointments, getAppointementById,
  getAppointmentBySessionId, createAppointment
} from '../controllers/appointments'
// MIDDLEWARE
import AppointmentValidateFieldsMiddleware from '../middleware/appointment/createAppointmentMiddleware'

const routerAppointments = Router()
routerAppointments.get("/all", getAllAppointments)
routerAppointments.get("/session/all", getAppointmentBySessionId)
routerAppointments.post("/create", createAppointment)
routerAppointments.get("/:appointmentId", getAppointementById)

export default routerAppointments