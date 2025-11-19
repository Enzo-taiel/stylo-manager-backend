import { ERROR_CODES } from "./errorCodes";
import { ValidationError } from "express-validator";

export function createError(err: any) {

  console.log({ err })

  // 🧪 Es un error de express-validator
  if (err?.inputError && err.inputError.msg) {
    const e: ValidationError = err.inputError;
    return {
      ...ERROR_CODES.VALIDATION_ERROR,
      issue: {
        path: (e as any).path,
        message: e.msg
      }
    };
  }

  // 🧪 Error lanzado manualmente con httpStatus
  if (err.status) {
    const match = Object.values(ERROR_CODES).find(e => e.httpStatus === err.status);
    return match ?? ERROR_CODES.UNKNOWN_ERROR;
  }

  // 🧪 Error nativo JS
  if (err instanceof Error) {
    return {
      ...ERROR_CODES.UNKNOWN_ERROR,
      message: err.message
    };
  }

  return ERROR_CODES.UNKNOWN_ERROR;
}
