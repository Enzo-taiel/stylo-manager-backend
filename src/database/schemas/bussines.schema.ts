import mongoose, { SchemaDefinition } from "mongoose";

export const BusinessSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
}