import { Server } from "socket.io";
import { formatDate } from "../../helpers/formatDate";
import { sendPushNotification } from "../../services/expo/expoService";
import { TempAppointmentsModel } from "../../database/models/index.model";
import { sendWspCancelAppointmentSuccessfully } from "../../functions/sendWhatsapp";

export const handleDeleteDocument = async (data: any, io: Server) => {
  const document = data.documentKey
  const clientData = await TempAppointmentsModel.findOne({ appointmentId: document._id })

  if (!clientData) return
  // await sendWspCancelAppointmentSuccessfully({
  //   phone: "54" + clientData!.clientPhone,
  //   clientName: clientData!.clientName,
  //   employeeName: clientData!.employeeName,
  // })


  io.emit("appointment:deleted", document._id)

  await sendPushNotification(
    clientData!.expoPushToken,
    `Cancelacion de turno para ${clientData!.employeeName}!`,
    `${clientData!.clientName} acaba de cancelar la cita del dia ${formatDate(clientData!.date)} a las ${clientData!.hour} con ${clientData!.employeeName.split(" ")[0]}`
  )

  await clientData!.deleteOne()
};
