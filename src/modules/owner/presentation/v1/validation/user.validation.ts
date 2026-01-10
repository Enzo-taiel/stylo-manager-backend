import { body } from "express-validator";

export const expoPushTokenValidation = [
  body("expoPushToken")
    .exists().withMessage("El token es obligatorio.")
    .isString().withMessage("El token debe ser una cadena.")
    .matches(/^(ExponentPushToken|ExpoPushToken)\[[A-Za-z0-9-_]+\]$/)
    .withMessage("Expo Push Token inválido."),
];