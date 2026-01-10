import { Server } from "socket.io";
import { formatDate } from "@/shared/utils/formatDate";
import { expoService } from "@/shared/infrastructure/external/expo.service";
import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository";

export const handleUpdateDocument = async (data: any, io: Server) => {
  if (data.operationType !== "update") return

  const updateFields = data.updateDescription.updatedFields

  if (!updateFields.status) return

  const document = data.documentKey
  const appointmentEntity = await AppointmentRepository.findById(document._id)
  if (!appointmentEntity) return
  
  const businessEntity = await appointmentEntity.getBusiness()
  const ownerEntity = await businessEntity!.getOwner()
  const employeeEntity = await appointmentEntity.getEmployee()
  
  const appointment = appointmentEntity.toPrimitives()
  const owner = ownerEntity!.toPrimitives()
  const employee = employeeEntity!.toPrimitives()

  if (updateFields.status === "cancel_by_client" && owner.expoPushToken) {
    await expoService.sendPushNotification(
      owner.expoPushToken,
      `${appointment.clientName} cancelo el turno !`,
      `el turno asignado para ${employee.name} del dia ${formatDate(appointment.date)} a las ${appointment.hour} fue cancelado por el cliente.`
    )
  }

  return
};
