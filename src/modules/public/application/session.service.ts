import { withTransaction } from "shared/database/withTransaction";
import { ISession, ISessionDocument } from "@/core/session/domain/session.type";
import { SessionRepository } from "@/core/session/infrastructure/session.repository";

export class PublicSessionService {

  static async createSession(sessionData: Partial<ISession>) {
    return withTransaction<ISessionDocument>(async (session) => {
      const sessionDoc = await SessionRepository.createSession(sessionData, session)
      return sessionDoc
    })
  }

  static async updateSession(sessionId: string, sessionData: Partial<ISession>) {
    return withTransaction(async (session) => {
      const sessionDoc = await SessionRepository.updateSession(sessionId, sessionData, session)
      return sessionDoc
    })
  }

}