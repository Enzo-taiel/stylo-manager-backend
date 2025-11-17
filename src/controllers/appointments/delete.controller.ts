import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { AppointmentsModel, EmployeesModel, TempAppointmentsModel } from "../../database/models/index.model";

export const deleteAppointmentByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const appointmentId = req.params.appointmentId;
  const sessionTransaction = await mongoose.startSession();
  sessionTransaction.startTransaction();
  try {
    const appointment = await AppointmentsModel.findById(appointmentId)
      .session(sessionTransaction)
      .populate({ path: "client", select: "phone name" })
      .populate({ path: "service", select: "title" })
      .populate({ path: "employee", select: "_id name" })
      .populate({
        path: "business",
        populate: { path: "owner", select: "expo_push_token" }
      });

    if (!appointment) {
      await sessionTransaction.abortTransaction();
      return res.status(404).json({
        message: "Appointment does not exist.",
        success: false,
        error: false
      });
    }

    await TempAppointmentsModel.create(
      [{
        employeeName: appointment.employee.name,
        clientName: appointment.clientName,
        clientPhone: appointment.clientPhone,
        appointmentId: appointment._id,
        expoPushToken: appointment.business.owner.expo_push_token,
        date: appointment.date,
        hour: appointment.hour
      }],
      { session: sessionTransaction }
    );

    await EmployeesModel.findByIdAndUpdate(
      appointment.employee._id,
      { $pull: { appointments: appointment._id } },
      { session: sessionTransaction }
    );

    await AppointmentsModel.deleteOne(
      { _id: appointment._id },
      { session: sessionTransaction }
    );

    await sessionTransaction.commitTransaction();

    return res.status(200).json({
      message: "Appointment deleted successfully.",
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
