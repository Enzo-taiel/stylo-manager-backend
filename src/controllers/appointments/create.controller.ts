import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppointmentsModel, EmployeesModel, PaymentsModel, SessionsModel } from "../../database/models/index.model";

export const createAppointmentController = async (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ inputError: errors.array()[0] })

  const sessionId = req.sessionId
  const { serviceId, employeeId, clientName, clientPhone, date, hour, methodPayment } = req.body
  const sessionTransaction = await mongoose.startSession()
  sessionTransaction.startTransaction()

  try {
    const [appointment] = await AppointmentsModel.create([{
      service: serviceId,
      employee: employeeId,
      date,
      hour,
      methodPayment,
      sessionId,
      clientName,
      clientPhone,
      business: req.businessId
    }], { session: sessionTransaction })

    await EmployeesModel.findByIdAndUpdate(employeeId,
      { $push: { appointments: appointment._id } },
      { session: sessionTransaction }
    );

    const session = await SessionsModel.findOne({ sessionId }).session(sessionTransaction)
    if (!session) await SessionsModel.create(
      [{ sessionId, clientName, clientPhone }],
      { session: sessionTransaction }
    )

    await PaymentsModel.create([{
      business: req.businessId,
      appointment: appointment._id,
      employee: employeeId,
      amount: 0,
      method: methodPayment,
      status: "unpaid",
      tip: 0,
      discount: 0,
      subtotal: 0
    }], { session: sessionTransaction })

    await sessionTransaction.commitTransaction()

    return res.status(201).json({ message: "Appoitment create successfully.", appointment, success: true, error: false })
  } catch (error) {
    await sessionTransaction.abortTransaction()
    return next(error)
  } finally {
    sessionTransaction.endSession()
  }
}