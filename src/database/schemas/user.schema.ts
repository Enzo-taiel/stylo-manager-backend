import { SchemaDefinition } from 'mongoose'

export const UserSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
}