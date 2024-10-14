import { SchemaDefinition } from 'mongoose'

export const ClientsSchema: SchemaDefinition = {
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: false,
  },
}