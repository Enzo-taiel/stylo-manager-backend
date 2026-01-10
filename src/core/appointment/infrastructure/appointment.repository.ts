import { ClientSession } from "mongoose"
import { AppointmentModel } from "./appointment.model"
import { IAppointment } from "../domain/appointment.type"
import { AppointmentEntity } from "../domain/appointment.entity"

export class AppointmentRepository {

  static async findByBusinessId(businessId: string, session?: any) {
    const appointments = await AppointmentModel.find({ business: businessId }).session(session ?? null)
    if (!appointments) return null
    return appointments.map((app) => {
      return new AppointmentEntity({
        id: app._id,
        service: app.service.toString(),
        employee: app.employee.toString(),
        date: app.date,
        hour: app.hour,
        business: app.business.toString(),
        clientName: app.clientName,
        clientPhone: app.clientPhone,
        methodPayment: app.methodPayment,
        payments: app.payments.map(p => p.toString()),
        paymentStatus: app.paymentStatus,
        status: app.status,
        session: app.session
      })
    })
  }

  static async findById(appointmentId: string, session?: any) {
    const appointment = await AppointmentModel.findById(appointmentId).session(session ?? null)
      .populate("client")
      .populate("service")
      .populate("employee")
      .populate("business")
    if (!appointment) return null

    return new AppointmentEntity({
      id: appointment._id,
      date: appointment.date,
      hour: appointment.hour,
      status: appointment.status,
      session: appointment.session,
      clientName: appointment.clientName,
      clientPhone: appointment.clientPhone,
      service: appointment.service.toString(),
      methodPayment: appointment.methodPayment,
      paymentStatus: appointment.paymentStatus,
      business: appointment.business.toString(),
      employee: appointment.employee.toString(),
      payments: appointment.payments.map(p => p.toString())
    })
  }

  static async findAppointemntsBySession(sessionId: string, business: string, session?: any) {
    const appointments = await AppointmentModel.find({ session: sessionId, business }).session(session ?? null)
    return appointments.map((app) => {
      return new AppointmentEntity({
        id: app._id,
        date: app.date,
        hour: app.hour,
        status: app.status,
        session: app.session,
        clientName: app.clientName,
        clientPhone: app.clientPhone,
        service: app.service.toString(),
        methodPayment: app.methodPayment,
        paymentStatus: app.paymentStatus,
        business: app.business.toString(),
        employee: app.employee.toString(),
        payments: app.payments.map(p => p.toString())
      })
    })
  }

  static async findByEmployee(employeeId: String) {
    const appointments = await AppointmentModel.find({ employee: employeeId })
    if (!appointments.length) []
    return appointments.map((app) => {
      return new AppointmentEntity({
        id: app._id,
        service: app.service.toString(),
        employee: app.employee.toString(),
        date: app.date,
        hour: app.hour,
        business: app.business.toString(),
        clientName: app.clientName,
        clientPhone: app.clientPhone,
        methodPayment: app.methodPayment,
        payments: app.payments.map(p => p.toString()),
        paymentStatus: app.paymentStatus,
        status: app.status,
        session: app.session
      })
    })
  }

  static async create(appointmentData: Partial<IAppointment>, session: ClientSession) {
    const appointment = new AppointmentModel(appointmentData)
    await appointment.save({ session })
    return appointment;
  }

  static async update(appointmentId: string, appointmentData: Partial<IAppointment>, session: ClientSession) {
    return await AppointmentModel.findOneAndUpdate({ _id: appointmentId }, appointmentData).session(session)
  }

  static async setPaymentInAppointment(appointmentId: string, paymentId: string, session: ClientSession) {
    return await AppointmentModel.findOneAndUpdate({ _id: appointmentId }, { $push: { payments: paymentId } }).session(session)
  }

}