import { z } from "zod";
import { InputValidationError } from "@/shared/errors/inputValidationError";

const EmailSchema = z.email("Invalid email format");
const PhoneSchema = z.string().regex(/^\+?\d{8,15}$/);

export type CredentialType = "email" | "phone";

export class AuthCredential {
  private constructor(
    public readonly value: string,
    public readonly type: CredentialType
  ) { }

  static create(value: string): AuthCredential {

    const emailParsed = EmailSchema.safeParse(value);
    const phoneParsed = PhoneSchema.safeParse(value);

    if (emailParsed.success) {
      return new AuthCredential(value.toLowerCase(), "email");
    }

    if (phoneParsed.success) {
      return new AuthCredential(value.toLowerCase(), "phone");
    }

    throw new InputValidationError({
      path: "credential",
      message: "Credencial invalida."
    });

  }
}
