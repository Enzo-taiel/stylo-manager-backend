import mongoose, { ClientSession } from "mongoose";
import { SessionModel } from "./session.model";
import { ISession } from "../domain/session.type";

export class SessionRepository {
  static async createSession(sessionData: Partial<ISession>, session: ClientSession) {
    const sessionDoc = new SessionModel(sessionData)
    await sessionDoc.save({ session })
    return sessionDoc
  }

  static async updateSession(sessionId: string, sessionData: Partial<ISession>, session: ClientSession) {
    return await SessionModel.findOneAndUpdate({ _id: sessionId }, sessionData).session(session)
  }

  static async isExist(sessionId: string, opts?: { session?: ClientSession }) {
    return await SessionModel.findOne({ sessionId }).session(opts?.session ?? null)
  }

}