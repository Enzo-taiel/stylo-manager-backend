import { AppointmentsSchema } from "@/core/appointment/infrastructure/appointment.schema";
import mongoose from "mongoose";
import { TAppointmentStatus } from "../domain/appointment.type";

AppointmentsSchema.methods.getServicePrice = async function (session: mongoose.mongo.ClientSession) {
  const appointment = await this.populate({ path: "service", options: { session } });
  return appointment.service.price ?? 0
}

AppointmentsSchema.methods.updateStatus = async function (status: TAppointmentStatus, session: mongoose.mongo.ClientSession) {

  const allowedTransitions: Record<string, string[]> = {
    pending: ["confirmed", "cancel_by_client", "cancel_by_business"],
    confirmed: ["in_service", "cancel_by_client", "cancel_by_business"],
    in_service: ["completed", "no_show"],
    completed: [],
    cancel_by_client: [],
    cancel_by_business: [],
    no_show: [],
    paid: ["refunded"],
    refunded: []
  }

  const current = this.status;

  if (!allowedTransitions[current].includes(status)) {
    throw new Error(`Illegal status transition: ${current} → ${status}`);
  }

  if (session) this.$session(session);
  this.status = status

  try {
    await this.save({ session })
    return true
  } catch (error) {
    console.log("error en el method updateStatus", error)
    return false
  }
}