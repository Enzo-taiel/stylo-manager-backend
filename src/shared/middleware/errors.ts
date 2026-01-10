import { AppError } from "@/core/errors/appError";
import { Request, Response, NextFunction } from "express";

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface IErrorIssue {
  path: string;
  message: string;
}

export interface IErrorCode {
  code: string;
  message: string;
  severity: ErrorSeverity;
  httpStatus?: number;
  inputError?: IErrorIssue;
}

export const ERROR_CODES: Record<string, IErrorCode> = {

  // 🌟 Express Validator
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    message: "Uno o más campos contienen errores.",
    severity: "low",
    httpStatus: 400
  },

  // HTTP
  API_BAD_REQUEST: {
    code: "API_BAD_REQUEST",
    message: "Error en los datos enviados.",
    severity: "low",
    httpStatus: 400
  },
  API_UNAUTHORIZED: {
    code: "API_UNAUTHORIZED",
    message: "No autorizado.",
    severity: "medium",
    httpStatus: 401
  },
  API_NOT_FOUND: {
    code: "API_NOT_FOUND",
    message: "Recurso no encontrado.",
    severity: "low",
    httpStatus: 404
  },
  API_SERVER_ERROR: {
    code: "API_SERVER_ERROR",
    message: "Error interno del servidor.",
    severity: "high",
    httpStatus: 500
  },

  UNKNOWN_ERROR: {
    code: "UNKNOWN_ERROR",
    message: "Ocurrió un error inesperado.",
    severity: "critical"
  }
} as const

function createError(err: any): IErrorCode {

  // 1️⃣ Error de aplicación (case)
  // validamos que el error sea de la instancia de AppError y que el code exista.
  if (err instanceof AppError && ERROR_CODES[err.code]) {
    return {
      ...ERROR_CODES[err.code],
      message: err.message,
      inputError: (err as any).inputError
    };
  }

  // 4️⃣ Error nativo
  if (err instanceof Error) {
    return {
      ...ERROR_CODES.UNKNOWN_ERROR,
      message: err.message
    };
  }

  return ERROR_CODES.UNKNOWN_ERROR;
}



export function errorMiddleware(err: any, _req: Request, res: Response, next: NextFunction) {
  const parsed = createError(err);
  console.log({ parsed })
  console.log({ err })

  return res.status(parsed.httpStatus ?? 500).json({
    success: false,
    error: true,
    ...parsed,
  });
}
