import { NextFunction, Response, Request } from "express"
import { PublicAppointmentService } from "@/modules/public/application/appointment.service"
import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository"
import { IAppointment } from "@/core/appointment/domain/appointment.type"

export const obtainAppointmentsController = async (req: Request, res: Response, next: NextFunction) => {

  const sessionId = req.sessionId
  const businessId = req.businessId!

  try {
    const appointments = await AppointmentRepository.findAppointemntsBySession(sessionId, businessId)
    return res.status(200).json({
      message: "Appointments obtain successfully.",
      success: true,
      error: false,
      appointments
    })
  } catch (error) {

  }
}

export const obtainAppointmentController = async (req: Request, res: Response, next: NextFunction) => {

  const { appointmentId } = req.params

  try {
    const appointment = await PublicAppointmentService.getAppointmentById(appointmentId)
    return res.status(200).json({
      message: "Appointment obtain successfully.",
      success: true,
      error: false,
      appointment
    })
  } catch (error) {
    return next(error)
  }
}

export const createAppointmentController = async (req: Request, res: Response, next: NextFunction) => {

  const appointmentData = req.body as Partial<IAppointment>
  const businessId = req.businessId!
  const sessionId = req.sessionId

  try {
    const appointment = await PublicAppointmentService.createAppointment(sessionId, businessId, appointmentData)

    return res.status(200).json({
      message: "Appointment created successfully.",
      error: false,
      success: true,
      appointment
    })
  } catch (error) {
    return next(error)
  }
}

export const updateAppointmentController = async (req: Request, res: Response, next: NextFunction) => {

  const { appointmentId } = req.params
  const appointmentData = req.body

  try {
    const appointment = await PublicAppointmentService.updateAppointment(appointmentId, appointmentData)
    return res.status(200).json({
      message: "Appointment updated successfully.",
      error: false,
      succes: true,
      appointment
    })
  } catch (error) {
    return next(error)
  }
}