import mongoose from "mongoose";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppointmentsModel, EmployeesModel } from "../../database/models/index.models";

export const createAppointmentController = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()[0], error: true, success: false, message: "error in key value" });

  const sessionId = req.sessionId
  const { serviceId, employeeId, clientName, clientPhone, date, hour, methodPayment } = req.body
  const sessionTransaction = await mongoose.startSession()
  sessionTransaction.startTransaction()

  try {
    const appointment = await AppointmentsModel.create({
      service: serviceId,
      employee: employeeId,
      date,
      hour,
      methodPayment,
      sessionId,
      clientName,
      clientPhone
    })

    await EmployeesModel.findByIdAndUpdate(employeeId,
      { $push: { appointments: appointment._id } },
    );

    await sessionTransaction.commitTransaction()

    return res.status(200).json({ message: "Appoitment create successfully.", appointment, success: true, error: false })
  } catch (error) {
    await sessionTransaction.abortTransaction()
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  } finally {
    sessionTransaction.endSession()
  }
}