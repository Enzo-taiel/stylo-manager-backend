import z from "zod"

const UserEmailSchema = z
  .email("Formato de correo electrónico inválido.")
  .min(1, "Su correo electrónico no puede estar vacío.")
  .max(255);

export class UserEmail {
  private constructor(public readonly value: string) { }

  static create(value: string): UserEmail {
    const parsed = UserEmailSchema.safeParse(value);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    return new UserEmail(parsed.data.toLowerCase());
  }
}
