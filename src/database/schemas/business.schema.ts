import mongoose, { SchemaDefinition } from "mongoose";

export const BusinessSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favicon: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  domain: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  openDays: {
    type: Array<String>,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
}