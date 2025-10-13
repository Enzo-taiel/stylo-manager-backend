import { Server } from "socket.io";
import { formatDate } from "../../helpers/formatDate";
import { sendPushNotification } from "../../services/expo/expoService";
import { TempAppointmentsModel } from "../../database/models/index.models";
import { sendWspCancelAppointmentSuccessfully } from "../../functions/sendWhatsapp";

export const handleDeleteDocument = async (data: any, io: Server) => {
  const document = data.documentKey
  const clientData = await TempAppointmentsModel.findOne({ appointmentId: document._id })
  await sendWspCancelAppointmentSuccessfully({
    phone: "54" + clientData!.phoneClient,
    clientName: clientData!.clientName,
    employeeName: clientData!.employeeName,
  })

  await clientData!.deleteOne()

  io.emit("delete-appointment", document._id)

  await sendPushNotification(
    clientData!.expoPushToken,
    `Cancelacion de turno para ${clientData!.employeeName.split(" ")[0]}!`,
    `${clientData!.clientName.split(" ")[0]} acaba de cancelar la cita del dia ${formatDate(clientData!.date)} a las ${clientData!.hour} con ${clientData!.employeeName.split(" ")[0]}`)
};
