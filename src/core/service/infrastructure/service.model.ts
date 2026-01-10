import mongoose from "mongoose";
import { ServiceSchema } from "./service.schema";
import { IServiceDocument, IServiceModel } from "../domain/service.type";

export const ServiceModel = mongoose.model<IServiceDocument, IServiceModel>("service", ServiceSchema);