import { Schema, Types } from "mongoose";
import { IServiceDocument, IServiceModel } from "../domain/service.type";

export const ServiceSchema = new Schema<IServiceDocument, IServiceModel>({
  title: { type: String, required: true },
  price: { type: String, required: true },
  subtitle: { type: String, required: true },
  price_kids: { type: String, required: false },
  duration: { type: String, required: true },
  descriptions: [{ type: String, required: true }],
  business: {
    type: Types.ObjectId,
    ref: "business",
    required: true
  },
  employees_available: [
    {
      type: Types.ObjectId,
      ref: "employees",
      required: true
    }
  ],


})