import { Router } from "express";
import {
  getAllAppointmentsController, getAppointementByIdController,
  getAppointmentBySessionController, createAppointmentController,
  updateAppointmentByIdController, deleteAppointmentByIdController
} from "../controllers/appointments";
import CreateAppointmentValidateFieldsMiddleware from "../middleware/appointment/createAppointmentMiddleware";
import UpdateAppointmentValidateFieldsMiddleware from "../middleware/appointment/updateAppointmentMiddleware";

const routerAppointments = Router()
routerAppointments.post("/create", CreateAppointmentValidateFieldsMiddleware, createAppointmentController)

routerAppointments.get("/obtain/all", getAllAppointmentsController)
routerAppointments.get("/obtain/session", getAppointmentBySessionController)
routerAppointments.get("/obtain/:appointmentId", getAppointementByIdController)

routerAppointments.put("/update/:appointmentId", UpdateAppointmentValidateFieldsMiddleware, updateAppointmentByIdController)

routerAppointments.delete("/delete/:appointmentId", deleteAppointmentByIdController)


export default routerAppointments