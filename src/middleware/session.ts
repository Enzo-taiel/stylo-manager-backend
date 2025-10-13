import { Request, Response, NextFunction } from "express";

export const sessionMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies
  req.sessionId = sessionId
  next();
}