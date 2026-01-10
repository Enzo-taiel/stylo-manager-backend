import mongoose from "mongoose";
import { ClientSchema } from "./client.schema";
import { IClientDocument, IClientModel } from "../domain/client.type";

export const ClientModel = mongoose.model<IClientDocument, IClientModel>("client", ClientSchema);