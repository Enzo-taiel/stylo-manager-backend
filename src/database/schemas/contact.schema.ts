import { SchemaDefinition } from 'mongoose'

export const ContactSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  message: {
    type: String,
    require: true,
  },
  sessionId: {
    type: String,
    required: true
  }
}