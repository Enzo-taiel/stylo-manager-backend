import { SchemaDefinition } from 'mongoose'

export const ContactSchema: SchemaDefinition = {
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true
  },
  message: {
    type: String,
    required: true,
  },
}