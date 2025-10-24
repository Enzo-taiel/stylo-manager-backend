import { Response } from "express";

export const handleError = (res: Response, error: any, defaultMessage = "Error interno") => {
  console.error(`[Error] ${error.message || error}`);
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || defaultMessage,
    code: error.code || "INTERNAL_ERROR",
  });
};
