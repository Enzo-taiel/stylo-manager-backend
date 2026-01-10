import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const validateObjectIdInParams = (key: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {

    const value = req.params[key];

    if (!value) {
      return next({
        httpStatus: 400,
        code: "MISSING_ID",
        message: `El campo "${key}" es obligatorio.`,
      });
    }

    if (!Types.ObjectId.isValid(value)) {
      return next({
        httpStatus: 400,
        code: "INVALID_OBJECT_ID",
        message: `El ID "${value}" no es un ObjectId válido.`,
      });
    }

    next();
  };
};
