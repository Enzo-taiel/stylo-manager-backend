import { Server } from "socket.io";
import { formatDate } from "@/shared/utils/formatDate";
import { expoService } from "@/shared/infrastructure/external/expo.service";

export const handleDeleteDocument = async (data: any, io: Server) => {
  const document = data.documentKey
  // const clientData = await TempAppointmentsModel.findOne({ appointmentId: document._id })

  // if (!clientData) return
  // // await sendWspCancelAppointmentSuccessfully({
  // //   phone: "54" + clientData!.clientPhone,
  // //   clientName: clientData!.clientName,
  // //   employeeName: clientData!.employeeName,
  // // })

  // io.emit("appointment:deleted", document._id)

  // await expoService.sendPushNotification(
  //   clientData!.expoPushToken,
  //   `Cancelacion de turno para ${clientData!.employeeName}!`,
  //   `${clientData!.clientName} acaba de cancelar la cita del dia ${formatDate(clientData!.date)} a las ${clientData!.hour} con ${clientData!.employeeName.split(" ")[0]}`
  // )

  // await clientData!.deleteOne()
};
