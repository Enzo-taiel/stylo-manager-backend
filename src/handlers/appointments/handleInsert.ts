import { Server } from "socket.io";
import { formatDate } from "../../helpers/formatDate";
import { AppointmentsModel } from "../../database/models/index.model";
import { sendPushNotification } from "../../services/expo/expoService";
import { SendWhatsappSavedAppointmentSuccessfully } from "../../functions/sendWhatsapp";

export const handleInsertDocument = async (data: any, io: Server) => {
  const document = data.fullDocument;

  const appointment = await AppointmentsModel.findById(document._id)
    .populate({ path: "client", select: "phone full_name subscription" })
    .populate({ path: "employee", select: "full_name avatar_url expoPushToken" })
    .populate({ path: "service", select: "title duration price" })

  if (!appointment) return;

  await SendWhatsappSavedAppointmentSuccessfully({
    phone: "54" + (appointment.client?.phone ?? appointment.clientPhone),
    clientName: appointment.client?.full_name?.split(" ")[0] ?? appointment.clientName,
    employeeName: appointment.employee.full_name.split(" ")[0],
    appointmentDate: appointment.date,
    appointmentHour: appointment.hour,
  });

  io.emit("insert-appointment", appointment);

  if (appointment.employee.expoPushToken) {
    await sendPushNotification(
      appointment.employee.expoPushToken,
      `Nueva reservación para ${appointment.client.full_name.split(" ")[0]}!`,
      `${appointment.client.full_name.split(" ")[0]} acaba de reservar una cita con ${appointment.employee.full_name.split(" ")[0]} a las ${appointment.hour} del día ${formatDate(appointment.date)}`
    );
  }
};
