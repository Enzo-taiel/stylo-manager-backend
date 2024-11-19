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
  expoPushToken: {
    type: String,
    required: false
  },
  skills: [
    {
      type: String,
      required: true
    }
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
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
    },
    hour_unavailable: {
      type: String
    },
  }

}