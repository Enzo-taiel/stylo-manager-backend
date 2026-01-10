import mongoose, { Schema } from 'mongoose'
import { IAppointmentDocument, IAppointmentModel } from '../domain/appointment.type'

export type AppointmentStatusType = "pending" | "confirmed" | "in_service" | "completed" | "cancel_by_client" | "cancel_by_business" | "no_show" | "paid" | "refunded"
export const AppointmentStatusArray: AppointmentStatusType[] = ["pending", "confirmed", "in_service", "completed", "cancel_by_client", "cancel_by_business", "no_show", "paid", "refunded"]

export type PaymentStatusType = "unpaid" | "paid_card" | "paid_mp" | "paid_cash" | "paid_transfer" | "pending_online"
export const PaymentStatusArray: PaymentStatusType[] = ["unpaid", "paid_card", "paid_mp", "paid_cash", "paid_transfer", "pending_online"]

export const AppointmentsSchema = new Schema<IAppointmentDocument, IAppointmentModel>({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true
  },
  date: { type: String, required: true },
  hour: { type: String, required: true },
  // client: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "client",
  //   required: false
  // },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid_card", "paid_mp", "paid_cash", "paid_transfer", "pending_online"],
    default: "unpaid"
  },
  methodPayment: {
    type: String,
    enum: ["cash", "credit_card", "debit_card", "mercadopago", "transfer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "in_service", "completed", "cancel_by_client", "cancel_by_business", "no_show", "paid", "refunded"],
    default: "pending"
  },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "payments", required: false }],
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true
  },
  session: { type: String, required: true },
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true }
})