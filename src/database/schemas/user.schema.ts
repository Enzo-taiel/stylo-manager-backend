import { SchemaDefinition } from 'mongoose'
// OTHERS SCHEMAS
import { ClothesModel } from '../models/clothes.model'

export const UserSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
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
  business: {
    type: String,
    required: true
  }
}