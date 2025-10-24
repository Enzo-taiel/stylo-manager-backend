import { body } from 'express-validator'

// Middleware de validación para el objeto de inicio de sesión
export const validateFieldsUpdateService = [
  body('title')
    .optional()
    .isString()
    .withMessage("El titulo ingresado para el servicio debe ser un string."),

  body('subtitle')
    .optional()
    .isString()
    .withMessage("El subtitulo del servicio deben ser un string."),

  body('descriptions')
    .optional()
    .isArray()
    .withMessage("Las descripciones del servicio deben estar en un array."),

  body('price')
    .optional()
    .isString()
    .withMessage("El precio ingresado para el servicio debe ser una cadena de texto."),

  body('price_kids')
    .optional()
    .isString()
    .withMessage("El precio ingresado debe ser una cadena de texto."),

  body('employees_available')
    .notEmpty()
    .withMessage("Debes ingresar al menos un empleado disponibles para este servicio.")
    .isArray()
    .withMessage("Los empleados del servicio deben estar en un array.")
];