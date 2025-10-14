import { Request, Response } from 'express';
import { AppointmentsModel } from '../../database/models/index.models';
import { IAppointment } from '../../database/interface/appointments.interface';

export const getAllAppointmentsController = async (_req: Request, res: Response) => {
  try {
    const appointments: IAppointment[] = await AppointmentsModel.find()
      .populate("service")
      .populate("employee")
      .populate("client")

    return res.status(200).json({ message: "Appointments obtain successfully.", appointments })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const getAppointementByIdController = async (req: Request, res: Response) => {

  const appointmentId = req.params.appointmentId

  try {
    const appointment: IAppointment | null = await AppointmentsModel.findById(appointmentId)
      .populate({
        path: "service",
        select: "title price duration",
      })
      .populate("client", "full_name phone createdAt subscription")
      .populate("employee", "skills full_name avatar_url")

    if (!appointment) return res.status(400).json({ message: "No reservation found." })
    return res.status(200).json({
      message: `Appointment by _id obtain successfully`,
      appointment
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const getAppointmentBySessionController = async (req: Request, res: Response) => {

  const sessionId = req.sessionId
  try {
    const appointments = await AppointmentsModel.find({ sessionId }).populate("service").populate("employee")
    return res.status(200).json({ message: `Appointment by session obtain successfully`, appointments })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }

}