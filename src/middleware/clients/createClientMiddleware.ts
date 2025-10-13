import { body } from 'express-validator'

const validateFieldsInsertClient = [
  body('clientName')
    .isString()
    .withMessage("El nombre ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su nombre completo.")
    .isLength({ min: 3 })
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres'),
  body('clientPhone')
    .isString()
    .withMessage("El numero ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su numero de celular."),
];

export default validateFieldsInsertClient