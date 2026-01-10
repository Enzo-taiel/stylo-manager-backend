import validator from "validator";
import { body, Meta } from "express-validator";
import { validateRequest } from "@/shared/middleware/validateRequest";

const validateSring = (value: string) => value.includes("@")
// Validar formato de credential
const validateCredentialFormat = (credential: string) => {
  if (validateSring(credential)) {
    if (!validator.isEmail(credential)) {
      throw Error("Ingrese una credencial valida.")
    }
    return true;
  } else {
    if (!/^[+]?[0-9]{7,15}$/.test(credential)) {
      throw Error("Ingrese una credencial valida.")
    }
    return true;
  }
};

export const signinValidation = [
  body("credential")
    .isString().withMessage("La credencial debe ser una cadena de texto.")
    .notEmpty().withMessage("La credencial es requerida.")
    .custom(validateCredentialFormat),

  body("password")
    .isString().withMessage("La contraseña debe ser una cadena de texto.")
    .notEmpty().withMessage("La contraseña es requerida.")
    .isLength({ min: 6 }),
  validateRequest
];

// Password repeat
const verifyMatchPasswordRepeat = (repeat: string, { req }: Meta) => {
  if (repeat !== req.body.password) {
    throw Error("Sus contraseñas no coinciden.")
  }
  return true;
};

export const signupValidation = [
  // Nombre
  body("name")
    .trim()
    .notEmpty().withMessage("Ingrese su nombre.")
    .isLength({ min: 3 }).withMessage("Ingrese un nombre válido."),

  // Teléfono
  body("phone")
    .trim()
    .notEmpty().withMessage("Ingrese un número de teléfono.")
    .matches(/^[+]?[0-9]{7,15}$/).withMessage("Ingrese un número de teléfono válido."),

  // Email
  body("email")
    .trim()
    .notEmpty().withMessage("Ingrese su email.")
    .isEmail().withMessage("Ingrese un email válido."),

  // Contraseña
  body("password")
    .notEmpty().withMessage("Ingrese su contraseña.")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres."),

  // Repetir contraseña
  body("passwordRepiter")
    .notEmpty().withMessage("Repita su contraseña.")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres.")
    .custom(verifyMatchPasswordRepeat),
  validateRequest
];

export const refreshTokenValidation = [
  body("refreshToken")
    .notEmpty().withMessage("refresh token not is provided."),
  validateRequest
]
