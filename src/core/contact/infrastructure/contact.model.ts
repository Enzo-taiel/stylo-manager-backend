import mongoose from "mongoose";
import { contactSchema } from "./contact.schema";
import { IContactDocument, IContactModel } from "../domain/contact.type";

export const ContactModel = mongoose.model<IContactDocument, IContactModel>("contact", contactSchema);