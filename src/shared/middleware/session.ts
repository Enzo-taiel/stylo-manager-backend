import { Request, Response, NextFunction } from "express";
import { withTransaction } from "../database/withTransaction";
import { SessionRepository } from "@/core/session/infrastructure/session.repository";

export const sessionMiddleware = async (req: Request, _res: Response, next: NextFunction) => {

  const { sessionId } = req.cookies

  await withTransaction(async (session) => {
    const sessionDoc = await SessionRepository.isExist(sessionId, { session })
    if (sessionDoc) {
      req.sessionId = sessionDoc._id.toString()
    } else {
      const newSession = await SessionRepository.createSession({ sessionId }, session)
      req.sessionId = newSession._id.toString()
    }
  })

  next();

}