import mongoose, { SchemaDefinition } from 'mongoose'

export const SalesSchema: SchemaDefinition = {
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees",
  },
  mount: {
    type: String,
    require: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
  },
  methodPayment: {
    type: String,
    require: true
  }
}