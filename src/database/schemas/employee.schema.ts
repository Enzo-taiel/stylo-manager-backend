import mongoose, { SchemaDefinition } from 'mongoose'

export const EmployeesSchema: SchemaDefinition = {
  name: {
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
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "business",
    required: true
  },
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
      type: String,
      required: false
    },
    instagramUsername: {
      type: String,
      required: false
    },
    days_available: {
      type: String,
      required: true
    },
    hours_available: {
      type: String,
      required: true
    }
  },
  jobs: [
    {
      type: String,
      required: false
    }
  ]
}