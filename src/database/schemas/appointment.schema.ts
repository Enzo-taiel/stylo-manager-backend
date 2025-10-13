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