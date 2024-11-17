import { SchemaDefinition } from 'mongoose'

export const TempAppointmentsSchema: SchemaDefinition = {
  employeeName: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  phoneClient: {
    type: String,
    required: true
  },
  appointmentId: {
    type: String,
    require: true
  },
  expoPushToken: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  hour: {
    type: String,
    require: true
  }
}