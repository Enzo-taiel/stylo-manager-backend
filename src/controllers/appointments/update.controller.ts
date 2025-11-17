import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { AppointmentsModel, EmployeesModel } from "../../database/models/index.model";

export const updateAppointmentByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const appointmentId = req.params.appointmentId as string;
  const { serviceId, employeeId, date, hour, methodPayment, clientName, clientPhone } = req.body;
  const sessionTransaction = await mongoose.startSession();
  sessionTransaction.startTransaction();
  try {
    const currentAppointment = await AppointmentsModel.findById(appointmentId).session(sessionTransaction);
    if (!currentAppointment) {
      await sessionTransaction.abortTransaction();
      return next({ status: 404, message: "Appointment not found" });
    }

    const oldEmployeeId = currentAppointment.employee;
    const newAppointment = await AppointmentsModel.findByIdAndUpdate(appointmentId, {
      employee: employeeId,
      service: serviceId,
      date,
      hour,
      clientName,
      clientPhone,
      methodPayment
    }, { new: true, session: sessionTransaction });

    if (!newAppointment) {
      await sessionTransaction.abortTransaction();
      return next({ status: 404, message: "Appointment not found" });
    }

    // Si cambió el empleado, actualizar sus listas
    if (!oldEmployeeId.equals(newAppointment.employee)) {
      // Sacar la cita del empleado viejo
      await EmployeesModel.findByIdAndUpdate(oldEmployeeId,
        { $pull: { appointments: newAppointment._id } },
        { session: sessionTransaction });

      // Agregar la cita al empleado nuevo
      await EmployeesModel.findByIdAndUpdate(newAppointment.employee,
        { $push: { appointments: newAppointment._id } },
        { session: sessionTransaction });
    }

    await sessionTransaction.commitTransaction();

    return res.status(200).json({
      message: "Appointment updated successfully.",
      appointment: newAppointment,
      success: true,
      error: false
    });

  } catch (error) {
    await sessionTransaction.abortTransaction();
    return next(error);
  } finally {
    sessionTransaction.endSession();
  }
};
