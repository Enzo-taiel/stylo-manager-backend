import mongoose, { Schema } from "mongoose";
import { IBusinessDocument, IBusinessModel } from "../domain/business.type";

export const BusinessSchema = new Schema<IBusinessDocument, IBusinessModel>({
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
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  schedule: {
    type: String,
    required: true,
  },
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  openDays: {
    type: [String],
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
}, { timestamps: true });