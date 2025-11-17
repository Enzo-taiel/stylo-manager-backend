import { body, Meta } from "express-validator";
import { UsersModel } from "../../database/models/index.model";

// Validación de teléfono profesional
const phoneRegex = /^[+]?[0-9]{7,15}$/;

// Email existente (USANDO .exists → MÁS RÁPIDO)
const verifyThatEmailExist = async (email: string) => {
  const exists = await UsersModel.exists({ email });
  if (exists) throw new Error("El email ingresado ya está registrado.");
};

// Teléfono existente (USANDO .exists → MÁS RÁPIDO)
const verifyThatPhoneExist = async (phone: string) => {
  const exists = await UsersModel.exists({ phone });
  if (exists) throw new Error("El teléfono ingresado ya está registrado.");
};

// Password repeat
const verifyMatchPasswordRepeat = (repeat: string, { req }: Meta) => {
  if (repeat !== req.body.password)
    throw new Error("Las contraseñas no coinciden.");
  return true;
};

const validateFieldsSignup = [
  // Nombre
  body("userName")
    .trim()
    .notEmpty().withMessage("Ingrese su nombre.")
    .isLength({ min: 3 }).withMessage("Ingrese un nombre válido."),

  // Teléfono
  body("userPhone")
    .trim()
    .notEmpty().withMessage("Ingrese un número de teléfono.")
    .matches(phoneRegex).withMessage("Ingrese un número de teléfono válido.")
    .custom(verifyThatPhoneExist),

  // Email
  body("userEmail")
    .trim()
    .notEmpty().withMessage("Ingrese su email.")
    .isEmail().withMessage("Ingrese un email válido.")
    .custom(verifyThatEmailExist),

  // Contraseña
  body("password")
    .notEmpty().withMessage("Ingrese su contraseña.")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres."),

  // Repetir contraseña
  body("passwordRepiter")
    .notEmpty().withMessage("Repita su contraseña.")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres.")
    .custom(verifyMatchPasswordRepeat),
];

export default validateFieldsSignup;
