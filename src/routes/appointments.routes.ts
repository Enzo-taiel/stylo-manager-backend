import { Router } from "express";
import {
  getAllAppointmentsController, getAppointementByIdController,
  getAppointmentBySessionController, createAppointmentController,
  updateAppointmentByIdController, deleteAppointmentByIdController
} from "../controllers/appointments";
import CreateAppointmentValidateFieldsMiddleware from "../middleware/appointment/createAppointmentMiddleware";
import UpdateAppointmentValidateFieldsMiddleware from "../middleware/appointment/updateAppointmentMiddleware";
import { identifyBusinessWebOnly } from "../middleware/business/identifyBusiness";

const routerAppointments = Router()
routerAppointments.post("/create", CreateAppointmentValidateFieldsMiddleware, identifyBusinessWebOnly, createAppointmentController)

routerAppointments.get("/obtain/all", identifyBusinessWebOnly, getAllAppointmentsController)
routerAppointments.get("/obtain/session", identifyBusinessWebOnly, getAppointmentBySessionController)

// rutas para consumir con react-native
routerAppointments.get("/obtain/:appointmentId", getAppointementByIdController)
routerAppointments.put("/update/:appointmentId", UpdateAppointmentValidateFieldsMiddleware, updateAppointmentByIdController)
routerAppointments.delete("/delete/:appointmentId", deleteAppointmentByIdController)


export default routerAppointments