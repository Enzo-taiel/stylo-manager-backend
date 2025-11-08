import { Server } from "socket.io";
import { formatDate } from "../../helpers/formatDate";
import { AppointmentsModel } from "../../database/models/index.model";
import { sendPushNotification } from "../../services/expo/expoService";
import { SendWhatsappSavedAppointmentSuccessfully } from "../../functions/sendWhatsapp";

export const handleInsertDocument = async (data: any, io: Server) => {
  const document = data.fullDocument;

  const appointment = await AppointmentsModel.findById(document._id)
    .populate({ path: "client", select: "phone name subscription" })
    .populate({ path: "employee", select: "name avatar_url expoPushToken" })
    .populate({ path: "service", select: "title price" })
    .populate({ path: "business", populate: { path: "owner", select: "expo_push_token" } });

  if (!appointment) return;

  // await SendWhatsappSavedAppointmentSuccessfully({
  //   phone: "54" + (appointment.client?.phone ?? appointment.clientPhone),
  //   clientName: appointment.client?.name?.split(" ")[0] ?? appointment.clientName,
  //   employeeName: appointment.employee.name.split(" ")[0],
  //   appointmentDate: appointment.date,
  //   appointmentHour: appointment.hour,
  // });

  io.emit("appointment:created", appointment);

  const expoPushToken = appointment.business.owner.expo_push_token

  if (expoPushToken) {
    await sendPushNotification(
      expoPushToken,
      `Nueva reservación para ${appointment.clientName}!`,
      `${appointment.clientName} acaba de reservar una cita con ${appointment.employee.name} a las ${appointment.hour} del día ${formatDate(appointment.date)}`
    );
  }
};
