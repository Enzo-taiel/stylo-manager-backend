import { Router } from "express";
import { handleAuthentication } from "@/shared/middleware/authentication";
import { ResolveDomainMiddleware } from "@/shared/middleware/resolveDomain";
import { validateObjectIdInParams } from "@/shared/middleware/validateObjectId";
import { updateAppointmentValidation, createAppointmentValidation } from "../validation/appointment.validation";
import { obtainAppointmentsController, obtainAppointmentController, updateAppointmentController, createAppointmentController } from "../controllers/appointment.controller";
import { sessionMiddleware } from "@/shared/middleware/session";

export const PublicAppointmentRoutesV1 = Router()
PublicAppointmentRoutesV1.use(sessionMiddleware)

PublicAppointmentRoutesV1.get(
  "/",
  ResolveDomainMiddleware,
  obtainAppointmentsController
)

PublicAppointmentRoutesV1.post(
  "/",
  ResolveDomainMiddleware,
  createAppointmentValidation,
  createAppointmentController
)

PublicAppointmentRoutesV1.get(
  "/:appointmentId",
  handleAuthentication,
  validateObjectIdInParams("appointmentId"),
  obtainAppointmentController
)

PublicAppointmentRoutesV1.put(
  "/:appointmentId",
  handleAuthentication,
  validateObjectIdInParams("appointmentId"),
  updateAppointmentValidation,
  updateAppointmentController
)
