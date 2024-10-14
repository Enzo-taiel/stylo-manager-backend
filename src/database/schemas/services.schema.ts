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
  price_kids: {
    type: String,
  },
  descriptions: [
    {
      type: String,
      require: true
    }
  ],
  employees_vailable: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true
    }
  ]
  
}