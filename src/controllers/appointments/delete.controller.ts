import mongoose from "mongoose";
import { Request, Response } from "express";
import { AppointmentsModel, EmployeesModel, TempAppointmentsModel } from "../../database/models/index.models";

export const deleteAppointmentByIdController = async (req: Request, res: Response) => {
  const appointmentId = req.params.appointmentId
  const sessionTransaction = await mongoose.startSession()
  sessionTransaction.startTransaction()
  try {
    const appointment = await AppointmentsModel.findById(appointmentId)
      .populate({ path: "client", select: "phone name" })
      .populate({ path: "service", select: "title" })
      .populate({ path: "employee", select: "_id name expoPushToken" })

    if (!appointment) return res.status(204).json({ message: "Not appointment exist.", success: false, error: false})

    await TempAppointmentsModel.create({
      employeeName: appointment.employee.name,
      clientName: appointment.clientName,
      phoneClient: appointment.client.phone,
      appointmentId: appointment._id,
      expoPushToken: appointment.employee.expoPushToken,
      date: appointment.date,
      hour: appointment.hour
    })

    await EmployeesModel.findByIdAndUpdate(appointment.employee._id, { $pull: { appointments: appointment._id } }, { new: true })
    await appointment.deleteOne()
    await sessionTransaction.commitTransaction()
    return res.status(200).json({ message: "Appointment delete successfully.", success: true, error: false })
  } catch (error) {
    await sessionTransaction.abortTransaction()
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: false, error: true })
  } finally {
    sessionTransaction.endSession()
  }
}
