import mongoose, { SchemaDefinition } from 'mongoose'

export const AppointmentsSchema: SchemaDefinition = {
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    required: false
  },
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
  paymentId: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientPhone: {
    type: String,
    required: true
  }
}