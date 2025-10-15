import mongoose from "mongoose";
import { Request, Response } from "express";
import { AppointmentsModel, EmployeesModel } from "../../database/models/index.models";

export const updateAppointmentByIdController = async (req: Request, res: Response) => {
  const appointmentId = req.params.appointmentId as string
  const { serviceId, employeeId, date, hour, methodPayment, clientName, clientPhone } = req.body
  const sessionTransaction = await mongoose.startSession()
  sessionTransaction.startTransaction()
  try {
    const currentAppointment = await AppointmentsModel.findById(appointmentId)
    if (!currentAppointment) return res.status(204).json({ message: "Appointment not exist.", error: true, success: false })
    const newAppointment = await AppointmentsModel.findByIdAndUpdate(
      appointmentId, {
      employee: employeeId,
      service: serviceId,
      date: date,
      hour,
      clientName,
      clientPhone,
      methodPayment
    }, { new: true })
    if (!newAppointment) return res.status(204).json({ message: "Appointment not exist.", success: false, error: true })
    if (currentAppointment.employee !== newAppointment.employee) {
      await EmployeesModel.findByIdAndUpdate(currentAppointment.employee,
        { $pull: { appointments: newAppointment._id } }
      )
      await EmployeesModel.findByIdAndUpdate(employeeId,
        { $push: { appointments: newAppointment._id } }

      )
    }
    await sessionTransaction.commitTransaction()
    return res.status(200).json({ message: "Appointments update successfully.", appointment: newAppointment, suscess: true, error: false })
  } catch (error) {
    await sessionTransaction.abortTransaction()
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", success: true, error: false })
  } finally {
    sessionTransaction.endSession()
  }
}
