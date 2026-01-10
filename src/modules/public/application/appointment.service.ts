import { withTransaction } from "@/shared/database/withTransaction";
import { IAppointment } from "@/core/appointment/domain/appointment.type";
import { EmployeeRepository } from "@/core/employee/infrastructure/employee.repository";
import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository";
import { PaymentRepository } from "@/core/payment/infrastructure/payment.repository";
import { SessionRepository } from "@/core/session/infrastructure/session.repository";

export class PublicAppointmentService {

  static async getAppointmentsBySession(sessionId: string, businessId: string) {
    try {
      const appointments = await AppointmentRepository.findAppointemntsBySession(sessionId, businessId)
      return appointments
    } catch (error) {
      throw error
    }
  }

  static async getAppointmentById(appointmentId: string) {
    try {
      const appointment = await AppointmentRepository.findById(appointmentId)
      return appointment
    } catch (error) {
      throw error
    }
  }

  static async createAppointment(sessionId: string, businessId: string, appointmentData: Partial<IAppointment>) {
    return withTransaction(async (session) => {
      const appointment = await AppointmentRepository.create(appointmentData, session)
      const appointmentId = appointment._id
      const employeeId = appointment.employee._id.toString()

      await EmployeeRepository.asignAppointment(employeeId, appointmentId, session)
      await SessionRepository.updateSession(sessionId,
        { clientName: appointment.clientName, clientPhone: appointment.clientPhone },
        session
      )

      const payment = await PaymentRepository.create({
        //@ts-ignore
        business: businessId,
        appointment: appointment._id,
        //@ts-ignore
        employee: employeeId,
        amount: 0,
        method: appointment.methodPayment,
        status: "unpaid",
        tip: 0,
        discount: 0,
        subtotal: 0
      }, session)

      const appointmentDoc = await AppointmentRepository.setPaymentInAppointment(appointmentId, payment._id.toString(), session)

      return appointmentDoc

    })
  }

  static async updateAppointment(appointmentId: string, appointmentData: Partial<IAppointment>) {
    return withTransaction(async (session) => {
      const oldAppointment = await AppointmentRepository.findById(appointmentId, { session })
      const newAppointment = await AppointmentRepository.update(appointmentId, appointmentData, session)

      const oldEmployeeId = oldAppointment!.employeeId;
      const newEmployeeId = newAppointment!.employee.toString();

      if (oldEmployeeId !== newEmployeeId) {
        await EmployeeRepository.removeAppointment(oldEmployeeId, appointmentId, session)
        await EmployeeRepository.asignAppointment(newEmployeeId, appointmentId, session)
      }

      return newAppointment
    })
  }

}