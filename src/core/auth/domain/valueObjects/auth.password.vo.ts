import z from "zod"
import { InputValidationError } from "@/shared/errors/inputValidationError";

const UserPasswordSchema = z
  .string()
  .min(6, "contraseña muy corta - debe tener al menos 6 caracteres")

export class AuthPassword {
  private constructor(public readonly value: string) { }

  static create(value: string): AuthPassword {
    const parsed = UserPasswordSchema.safeParse(value);

    if (parsed.success) {
      return new AuthPassword(value);
    }

    throw new InputValidationError({
      path: "password",
      message: parsed.error.issues[0].message,
    })

  }
}