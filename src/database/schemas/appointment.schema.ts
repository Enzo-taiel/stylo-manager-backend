import mongoose, { SchemaDefinition } from 'mongoose'

export const AppointmentsSchema: SchemaDefinition = {
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
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
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees",
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    required: true
  },
  paymentStatus: {
    type: String,
    required: false,
    default: "pending"
  },
  methodPayment: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: false
  },
  sessionId: {
    type: String,
    required: true
  }
}