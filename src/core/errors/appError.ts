import { ERROR_CODES } from "@/shared/middleware/errors";

export abstract class AppError extends Error {
  protected constructor(
    public readonly code: keyof typeof ERROR_CODES,
    message?: string
  ) {
    super(message ?? ERROR_CODES[code].message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
