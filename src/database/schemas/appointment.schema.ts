import mongoose, { SchemaDefinition } from 'mongoose'

export const AppointmentsSchema: SchemaDefinition = {
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
    required: true
  },
  day: {
    type: String,
    require: true
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
  }
}