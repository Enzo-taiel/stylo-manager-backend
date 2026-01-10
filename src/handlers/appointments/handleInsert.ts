import { Server } from "socket.io";
import { formatDate } from "@/shared/utils/formatDate";
import { expoService } from "@/shared/infrastructure/external/expo.service";
import { BusinessRepository } from "@/core/business/infrastructure/business.repository";
import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository";

export const handleInsertDocument = async (data: any, io: Server) => {
  const document = data.fullDocument;

  const appointmentEntity = await AppointmentRepository.findById(document._id)
  if (!appointmentEntity) return

  const businessEntity = await BusinessRepository.findById(appointmentEntity.id!)
  const ownerEntity = await businessEntity!.getOwner()
  const employeeEntity = await appointmentEntity.getEmployee();

  const owner = ownerEntity!.toPrimitives()
  const appointment = appointmentEntity.toPrimitives()
  const employee = employeeEntity!.toPrimitives()

  if (owner.expoPushToken) {
    await expoService.sendPushNotification(
      owner.expoPushToken,
      `Nueva reservación para ${appointment.clientName}!`,
      `${appointment.clientName} acaba de reservar una cita con ${employee.name} a las ${appointment.hour} del día ${formatDate(appointment.date)}`
    )
  }
  return
};
