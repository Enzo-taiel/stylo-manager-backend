import { AppointmentsModel } from "@/database/models/index.models"
import { Types } from "mongoose"

export const deleteOneAppointment = async (appointmentId: Types.ObjectId)=> {
  return await AppointmentsModel.deleteOne({ _id: appointmentId })
}