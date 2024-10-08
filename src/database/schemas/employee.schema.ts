import { SchemaDefinition } from 'mongoose'

export const EmployeeSchema: SchemaDefinition = {
  full_name: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: false,
  },
  skills: [
    {
      type: String,
      require: true
    }
  ],
  
}