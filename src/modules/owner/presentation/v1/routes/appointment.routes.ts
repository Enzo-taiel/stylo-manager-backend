import { Router } from "express";
import { handleAuthentication } from "@/shared/middleware/authentication";
import { obtainAppointmentController, obtainAppointmentsController } from "../controllers/appointment.controller";
import { validateObjectIdInParams } from "@/shared/middleware/validateObjectId";

export const OwnerAppointmentRoutesV1 = Router()

OwnerAppointmentRoutesV1.get(
  "/",
  handleAuthentication,
  obtainAppointmentsController
)

OwnerAppointmentRoutesV1.get(
  "/:appointmentId",
  handleAuthentication,
  validateObjectIdInParams("appointmentId"),
  obtainAppointmentController
)


// AppointmentRoutesV1.put(
//   "/:appointmentId/status",
//   handleAuthentication,
//   validateObjectIdInParams("appointmentId"),
//   validateFieldsUpdateAppointmentStatus,
//   updateAppointmentStatusByIdController
// )
