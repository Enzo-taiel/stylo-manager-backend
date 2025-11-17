import { body, Meta } from "express-validator";
import { UsersModel } from "../../database/models/index.model";
import { isMatchPassword } from "../../helpers/jsonwebtoken"; // ideal mover a helpers/password
import validator from "validator";

// Detectar si parece email
const looksLikeEmail = (value: string) => value.includes("@");

// Validar formato de credential
const validateCredentialFormat = (credential: string) => {
  if (looksLikeEmail(credential)) {
    if (!validator.isEmail(credential)) {
      throw new Error("Ingrese un email válido.");
    }
  } else {
    if (!/^[+]?[0-9]{7,15}$/.test(credential)) {
      throw new Error("Ingrese un número telefónico válido.");
    }
  }
};

// Buscar usuario y guardar en req.userFound
const verifyThatUserExist = async (credential: string, { req }: Meta) => {
  validateCredentialFormat(credential);

  const user = await UsersModel.findOne({
    $or: [{ email: credential }, { phone: credential }],
  }).select("+password"); // importante

  if (!user) throw new Error("Su usuario no existe.");

  req.userFound = user; // guardamos el user completo
};

// Comparar password contra el hash del usuario encontrado
const verifyPassword = async (password: string, { req }: Meta) => {
  const user = req.userFound;

  if (!user) {
    throw new Error("Ocurrió un error inesperado. Intente nuevamente.");
  }

  const isMatch = await isMatchPassword(password, user.password);
  if (!isMatch) throw new Error("Su contraseña es incorrecta.");
};

const validateFieldsSignin = [
  body("credential")
    .notEmpty()
    .withMessage("Su credencial es requerida.")
    .custom(verifyThatUserExist),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida.")
    .custom(verifyPassword),
];

export default validateFieldsSignin;
