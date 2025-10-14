import { Router } from 'express'
// CONTROLLERS
import {
  getAllAppointmentsController, getAppointementByIdController,
  getAppointmentBySessionController, createAppointmentController,
  updateAppointmentByIdController
} from '../controllers/appointments'
// MIDDLEWARE
import CreateAppointmentValidateFieldsMiddleware from '../middleware/appointment/createAppointmentMiddleware'
import UpdateAppointmentValidateFieldsMiddleware from '../middleware/appointment/updateAppointmentMiddleware'

const routerAppointments = Router()
routerAppointments.post("/create", CreateAppointmentValidateFieldsMiddleware, createAppointmentController)

routerAppointments.get("/obtain/all", getAllAppointmentsController)
routerAppointments.get("/obtain/session", getAppointmentBySessionController)
routerAppointments.get("/obtain/:appointmentId", getAppointementByIdController)

routerAppointments.put("/update/:appointmentId", UpdateAppointmentValidateFieldsMiddleware, updateAppointmentByIdController)

routerAppointments.delete("/delete/:appointmentId")


export default routerAppointments