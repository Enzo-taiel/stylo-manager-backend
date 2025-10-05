import { body, Meta } from 'express-validator';
import { UsersModel } from '../../database/models/index.models';

// Validación personalizada para verificar si el empleado ya existe
const verifyThatEmployeeExist = async (full_name: string) => {
  const user = await UsersModel.findOne({ full_name });
  if (user) throw new Error('El empleado ya se encuentra establecido.');
}

// Validación de que todas las habilidades sean strings
const validationSkills = (skills: string[], { req }: Meta) => {
  if (!skills.every(skill => typeof skill === 'string')) {
    throw new Error("Todas las habilidades deben ser cadenas de texto.");
  }
  return true;
}

// Validación de arrays de strings
const validateStringArray = (arr: string[], fieldName: string) => {
  if (!Array.isArray(arr)) {
    throw new Error(`${fieldName} debe ser un array.`);
  }
  if (!arr.every(item => typeof item === 'string')) {
    throw new Error(`Todos los elementos de ${fieldName} deben ser cadenas de texto.`);
  }
  return true;
}

// Middleware de validación para crear un empleado
const validateFieldsInsertEmployee = [
  body('full_name')
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El nombre del empleado es requerido.")
    .isLength({ min: 3 })
    .withMessage('El nombre del empleado debe tener al menos 3 caracteres')
    .custom(verifyThatEmployeeExist),

  body('avatar_url')
    .optional()
    .isString()
    .withMessage("La URL del avatar debe ser una cadena de texto."),

  body('skills')
    .notEmpty()
    .withMessage("Debes ingresar al menos una habilidad.")
    .isArray()
    .withMessage("Las habilidades deben ser un array.")
    .custom(validationSkills),

  body('days_unavailable')
    .notEmpty()
    .custom(arr => validateStringArray(arr, 'days_unavailable')),

  body('hours_unavailable')
    .notEmpty()
    .custom(arr => validateStringArray(arr, 'hour_unavailable')),

  // Validación para info
  body('info').notEmpty().isObject().withMessage("Info debe ser un objeto."),
  body('info.city').optional().isString().withMessage("City debe ser una cadena de texto."),
  body('info.instagramUsername').optional().isString().withMessage("InstagramUsername debe ser una cadena de texto."),
  body('info.days_available').notEmpty().isString().withMessage("day_available debe ser una cadena de texto."),
  body('info.hours_available').notEmpty().isString().withMessage("hour_available debe ser una cadena de texto."),
];

export default validateFieldsInsertEmployee;
