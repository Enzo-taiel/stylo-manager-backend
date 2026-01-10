import { AppError } from "@/core/errors/appError";
import { IErrorIssue } from "../middleware/errors";

export class InputValidationError extends AppError {
  inputError: IErrorIssue;

  constructor(inputError: IErrorIssue) {
    super("VALIDATION_ERROR");
    this.inputError = inputError;
  }
}