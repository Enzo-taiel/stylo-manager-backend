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
  hint?: string;
}

export const ERROR_CODES: Record<string, IErrorCode> = {
  NETWORK_OFFLINE: {
    code: "NETWORK_OFFLINE",
    message: "No tienes conexión a internet.",
    severity: "medium"
  },
  NETWORK_TIMEOUT: {
    code: "NETWORK_TIMEOUT",
    message: "La solicitud tardó demasiado.",
    severity: "medium"
  },
  INVALID_JSON: {
    code: "INVALID_JSON",
    message: "La respuesta del servidor es inválida.",
    severity: "high"
  },

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
}
