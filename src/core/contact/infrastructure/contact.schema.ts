import { Schema, Types } from "mongoose";
import { IContactDocument, IContactModel } from "../domain/contact.type";

export const contactSchema = new Schema<IContactDocument, IContactModel>({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  message: {
    type: String,
    require: true,
  },
  session: {
    type: Types.ObjectId,
    ref: "session",
    required: true
  }
})