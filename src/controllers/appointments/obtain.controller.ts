import { Request, Response, NextFunction } from 'express';
import { AppointmentsModel } from '../../database/models/index.model';
import { IAppointment } from '../../database/interface/appointments.interface';

export const getAllAppointmentsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments: IAppointment[] = await AppointmentsModel.find()
      .populate("service")
      .populate("employee")
      .populate("client")

    return res.status(200).json({ message: "Appointments obtain successfully.", appointments })
  } catch (error) {
    return next(error)
  }
}

export const getAppointementByIdController = async (req: Request, res: Response, next: NextFunction) => {

  const appointmentId = req.params.appointmentId

  try {
    const appointment: IAppointment | null = await AppointmentsModel.findById(appointmentId)
      .populate({
        path: "service",
        select: "title price duration",
      })
      .populate("client", "full_name phone createdAt subscription")
      .populate("employee", "skills full_name avatar_url")

    if (!appointment) return next({ status: 404, message: "Appointment not found" });
    return res.status(200).json({
      message: `Appointment by _id obtain successfully`,
      appointment
    })
  } catch (error) {
    return next(error)
  }
}

export const getAppointmentBySessionController = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.sessionId
  try {
    const appointments = await AppointmentsModel.find({ sessionId }).populate("service").populate("employee")
    return res.status(200).json({ message: `Appointment by session obtain successfully`, appointments })
  } catch (error) {
    return next(error)
  }
}