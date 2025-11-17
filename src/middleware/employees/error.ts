import { Request, Response, NextFunction } from "express";
import { createError } from "../../core/errors/createError";

export function errorMiddleware(err: any, _req: Request, res: Response, next: NextFunction) {
  const parsed = createError(err);

  return res.status(parsed.httpStatus ?? 500).json({
    success: false,
    error: true,
    ...parsed,
  });
}
