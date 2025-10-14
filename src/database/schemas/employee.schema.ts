import mongoose, { SchemaDefinition } from 'mongoose'

export const EmployeesSchema: SchemaDefinition = {
  name: {
    type: String,
    require: true,
  },
  avatar_url: {
    type: String,
    require: false,
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
    }
  ],
  days_unavailable: [
    {
      type: String,
      require: true
    }
  ],
  hours_unavailable: [
    {
      type: String,
      require: true
    }
  ],
  info: {
    city: {
      type: String
    },
    instagramUsername: {
      type: String
    },
    days_available: {
      type: String,
      require: true
    },
    hours_available: {
      type: String,
      require: true
    }
  },
  jobs: [
    {
      type: String
    }
  ]
}