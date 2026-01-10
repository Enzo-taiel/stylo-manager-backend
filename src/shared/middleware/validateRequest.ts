import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { InputValidationError } from "../errors/inputValidationError";

export const validateRequest = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const e = errors.array()[0] as any // tu formato
    throw new InputValidationError({ path: e.path, message:  e.msg });
  }

  next();
};
