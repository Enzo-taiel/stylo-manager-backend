import { SchemaDefinition, Schema } from 'mongoose'

export const ClothesSchemaDefinition: SchemaDefinition = {
  product: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true
  },
}

export const ClothesSchema = new Schema(ClothesSchemaDefinition, { timestamps: true });