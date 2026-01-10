import mongoose from "mongoose";
import { AppointmentsSchema } from "./appointment.schema";
import { IAppointmentDocument, IAppointmentModel } from "../domain/appointment.type";

export const AppointmentModel = mongoose.model<IAppointmentDocument, IAppointmentModel>("appointment", AppointmentsSchema);