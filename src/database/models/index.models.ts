import mongoose from "mongoose";
import { Users_Schema } from "./users.models";
import { Employees_Schema } from "./employees.model";
import { Services_Schema } from "./services.models";
import { Clients_Schema } from "./clients.model";
import { Appointments_Schema } from "./appointments.models";
import { TempAppointments_Schema } from "./temp.appointment.model";
import { Sales_Schema } from "./sales.model";

import { Contact_Schema } from "./contact.models";
import { getIO } from "../sockets/connect";
import { SendWhatsappSavedAppointmentSuccessfully, sendWspCancelAppointmentSuccessfully } from "../../functions/sendWhatsapp";
import { sendPushNotification } from "../../services/expo/expoService";
import { formatDate } from "../../helpers/formatDate";

export const UsersModel = mongoose.model("users", Users_Schema)
export const EmployeesModel = mongoose.model("employees", Employees_Schema)
export const ServicesModel = mongoose.model("services", Services_Schema)
export const ClientsModel = mongoose.model("clients", Clients_Schema)
export const AppointmentsModel = mongoose.model("appointments", Appointments_Schema)
export const ContactModel = mongoose.model("contacts", Contact_Schema)
export const TempAppointmentsModel = mongoose.model("tempAppointments", TempAppointments_Schema)
export const SalesModel = mongoose.model("payments", Sales_Schema)


const changeStreamAppointment = AppointmentsModel.watch()

changeStreamAppointment.on("change", async (data) => {

  const io = getIO()

  if (data.operationType === "insert") {
    const document = data.fullDocument
    const appointment = await AppointmentsModel.findById(document._id)
      .populate({
        path: "client",
        select: "phone full_name",
      })
      .populate({
        path: "employee",
        select: "full_name avatar_url expoPushToken",
      })
      .populate({
        path: "service",
        select: "title duration price",
      }).lean()

    // Enviamos mensaje al cliente a traves de whatsapp para informar que la cita se guardo con exito.
    await SendWhatsappSavedAppointmentSuccessfully({
      phone: "54" + appointment!.client.phone,
      clientName: appointment!.client.full_name.split(" ")[0],
      employeeName: appointment!.employee.full_name.split(" ")[0],
      appointmentDate: appointment!.date,
      appointmentHour: appointment!.hour
    })

    // enviamos la cita para mostrarla en el dashboard en tiempo real.
    io.emit("insert-appointment", appointment)

    // logica para enviar la notificacion mediante push notification expo 

    await sendPushNotification(
      appointment!.employee.expoPushToken,
      `Nueva reservacion para ${appointment!.client.full_name.split(" ")[0]}!`,
      `${appointment!.client.full_name.split(" ")[0]} acaba de reservar una cita con ${appointment!.employee.full_name.split(" ")[0]} a las ${appointment!.hour} del dia ${formatDate(appointment!.date)}`)
  }

  if (data.operationType === "delete") {
    const document = data.documentKey
    const clientData = await TempAppointmentsModel.findOne({ appointmentId: document._id })
    await sendWspCancelAppointmentSuccessfully({
      phone: "54" + clientData!.phoneClient,
      clientName: clientData!.clientName,
      employeeName: clientData!.employeeName,
    })

    await clientData!.deleteOne()

    io.emit("delete-appointment", document._id)

    console.log(clientData)
    await sendPushNotification(
      clientData!.expoPushToken,
      `Cancelacion de turno para ${clientData!.employeeName}!`,
      `${clientData!.clientName.split(" ")[0]} acaba de cancelar la cita del dia ${formatDate(clientData!.date)} a las ${clientData!.hour} con ${clientData!.employeeName.split(" ")[0]}`)
  }

  if (data.operationType === "update") {
    const document = data.documentKey
    const appointment = await AppointmentsModel.findById(document)
      .populate("service")
      .populate("employee")
      .populate("client")
    io.emit("update-appointment", appointment)
  }

  return

})