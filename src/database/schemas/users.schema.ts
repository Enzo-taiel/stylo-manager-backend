import mongoose, { SchemaDefinition } from 'mongoose'

export const UserSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: false,
  },
  expo_push_token: {
    type: String,
    required: false
  }
}