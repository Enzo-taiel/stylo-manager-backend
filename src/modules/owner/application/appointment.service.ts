// import mongoose from "mongoose";
// import { AppointmentRepository } from "./appointment.repository";
// import { AppointmentsModel, PaymentsModel, EmployeesModel, SessionsModel } from "../../../database/models/index.model";
// import { AppointmentEvents } from "./appointment.events";

import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository";
import { withTransaction } from "@/shared/database/withTransaction";

export class OwnerAppointmentService {

  //   /** ------------------------------------------------------------------
  //    * CREATE APPOINTMENT (Dominio + Transacción + Métodos + Eventos)
  //    * ------------------------------------------------------------------ */
  //   static async create({
  //     serviceId,
  //     employeeId,
  //     businessId,
  //     clientName,
  //     clientPhone,
  //     date,
  //     hour,
  //     methodPayment,
  //     sessionId
  //   }) {

  //     const session = await mongoose.startSession();
  //     session.startTransaction();

  //     try {
  //       /** 1. Crear appointment */
  //       const appointment = await AppointmentRepository.create({
  //         service: serviceId,
  //         employee: employeeId,
  //         business: businessId,
  //         clientName,
  //         clientPhone,
  //         date,
  //         hour,
  //         methodPayment,
  //         sessionId
  //       }, session);

  //       /** 2. Vincular appointment al empleado */
  //       await EmployeesModel.findByIdAndUpdate(
  //         employeeId,
  //         { $push: { appointments: appointment._id } },
  //         { session }
  //       );

  //       /** 3. Crear sesión de cliente si no existe */
  //       const sessionExists = await SessionsModel.exists({ sessionId }).session(session);
  //       if (!sessionExists) {
  //         await new SessionsModel({ sessionId, clientName, clientPhone }).save({ session });
  //       }

  //       /** 4. Obtener precio usando método del dominio */
  //       const priceService = await appointment.getServicePrice(session);

  //       /** 5. Crear payment */
  //       const payment = new PaymentsModel({
  //         business: businessId,
  //         appointment: appointment._id,
  //         employee: employeeId,
  //         amount: priceService,
  //         method: methodPayment,
  //         status: "unpaid",
  //         tip: 0,
  //         discount: 0,
  //         subtotal: 0
  //       });

  //       await payment.save({ session });

  //       /** 6. Asociar payment al appointment */
  //       appointment.payments.push(payment._id);
  //       await appointment.save({ session });

  //       /** 7. Populate final */
  //       await appointment.populate([
  //         { path: "employee", options: { session } },
  //         { path: "service", options: { session } },
  //         { path: "payments", options: { session } }
  //       ]);

  //       /** 8. Emitir evento */
  //       AppointmentEvents.created(appointment);

  //       /** 9. Commit */
  //       await session.commitTransaction();
  //       session.endSession();

  //       return appointment;

  //     } catch (e) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       throw e;
  //     }
  //   }

  //   /** ------------------------------------------------------------------
  //    * UPDATE STATUS USING DOMAIN METHOD
  //    * ------------------------------------------------------------------ */
  //   static async updateStatus(appointmentId: string, status: AppointmentStatusType) {
  //     const session = await mongoose.startSession();
  //     session.startTransaction();

  //     try {
  //       const appointment = await AppointmentRepository.findById(appointmentId, session);
  //       if (!appointment) throw new Error("Appointment not found");

  //       const updatedAppointment = await appointment.updateStatus(status, session);

  //       AppointmentEvents.statusChanged(updatedAppointment);

  //       await session.commitTransaction();
  //       session.endSession();

  //       return updatedAppointment;

  //     } catch (e) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       throw e;
  //     }
  //   }

  //   /** ------------------------------------------------------------------
  //    * MARK AS PAID
  //    * ------------------------------------------------------------------ */
  //   static async markAsPaid(appointmentId: string, method: PaymentMethodType) {
  //     const session = await mongoose.startSession();
  //     session.startTransaction();

  //     try {
  //       const appointment = await AppointmentRepository.findById(appointmentId, session);
  //       if (!appointment) throw new Error("Appointment not found");

  //       const updated = await appointment.markAsPaid(method, session);

  //       AppointmentEvents.paid(updated);

  //       await session.commitTransaction();
  //       session.endSession();

  //       return updated;

  //     } catch (e) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       throw e;
  //     }
  //   }

  static async findAllAppointmentByBusinessId(businessId: string) {
    try {
      const appointments = await AppointmentRepository.findByBusinessId(businessId)
      return appointments
    } catch (error) {
      throw error
    }
  }

  static async findAppointmentById(appointmentId: string){
    const appointment = await AppointmentRepository.findById(appointmentId)
    return appointment
  }

}
