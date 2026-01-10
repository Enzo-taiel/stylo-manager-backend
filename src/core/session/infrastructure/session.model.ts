import mongoose from "mongoose";
import { SessionSchema } from "./session.schema";
import { ISessionDocument, ISessionModel } from "../domain/session.type";

export const SessionModel = mongoose.model<ISessionDocument, ISessionModel>("session", SessionSchema);