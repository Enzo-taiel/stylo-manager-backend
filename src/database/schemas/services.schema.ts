import mongoose, { SchemaDefinition } from 'mongoose'

export const ServicesSchema: SchemaDefinition = {
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "business",
    required: true
  },
  price_kids: {
    type: String,
    required: false
  },
  descriptions: [
    {
      type: String,
      required: true
    }
  ],
  employees_available: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true
    }
  ]

}