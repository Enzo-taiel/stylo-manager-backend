import mongoose, { SchemaDefinition } from 'mongoose'

export const EmployeesSchema: SchemaDefinition = {
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
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
      required: true
    }
  ],
  info: {
    city: {
      type: String
    },
    instagramUsername: {
      type: String
    },
    day_available: {
      type: String
    }
  }
}