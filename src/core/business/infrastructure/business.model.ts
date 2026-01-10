import mongoose from "mongoose";
import { IBusinessDocument, IBusinessModel } from "../domain/business.type";
import { BusinessSchema } from "./business.schema";

export const BusinessModel = mongoose.model<IBusinessDocument, IBusinessModel>("business", BusinessSchema);