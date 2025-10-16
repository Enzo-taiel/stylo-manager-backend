import { body } from "express-validator";

const validateFieldsInsertMessageContact = [
  body('name')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su nombre completo.")
    .isLength({ min: 3 })
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres'),
  body('phone')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su numero de celular."),
  body('message')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su mensaje.")
];

export default validateFieldsInsertMessageContact