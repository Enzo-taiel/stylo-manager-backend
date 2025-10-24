import { body, Meta } from 'express-validator';

// Validación de que todas las habilidades sean strings
const validationSkills = (skills: string[], { req }: Meta) => {
  if (!Array.isArray(skills)) throw new Error("Las habilidades deben ser un array.");
  if (!skills.every(skill => typeof skill === 'string')) {
    throw new Error("Todas las habilidades deben ser cadenas de texto.");
  }
  return true;
};

// Validación de arrays de strings
const validateStringArray = (arr: string[], fieldName: string) => {
  if (!Array.isArray(arr)) {
    throw new Error(`${fieldName} debe ser un array.`);
  }
  if (!arr.every(item => typeof item === 'string')) {
    throw new Error(`Todos los elementos de ${fieldName} deben ser cadenas de texto.`);
  }
  return true;
};

// Middleware de validación para ACTUALIZAR un empleado
export const validateFieldsUpdateEmployee = [
  body('name')
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 3 })
    .withMessage('El nombre del empleado debe tener al menos 3 caracteres'),

  body('avatar_url')
    .optional()
    .isString()
    .withMessage("La URL del avatar debe ser una cadena de texto."),

  body('skills')
    .optional()
    .isArray()
    .withMessage("Las habilidades deben ser un array.")
    .custom(validationSkills),

  body('days_unavailable')
    .optional()
    .custom(arr => validateStringArray(arr, 'days_unavailable')),

  body('hours_unavailable')
    .optional()
    .custom(arr => validateStringArray(arr, 'hours_unavailable')),

  // Validación para info
  body('info')
    .optional()
    .isObject()
    .withMessage("Info debe ser un objeto."),

  body('info.city')
    .optional()
    .isString()
    .withMessage("City debe ser una cadena de texto."),

  body('info.instagramUsername')
    .optional()
    .isString()
    .withMessage("InstagramUsername debe ser una cadena de texto."),

  body('info.days_available')
    .optional()
    .isString()
    .withMessage("day_available debe ser una cadena de texto."),

  body('info.hours_available')
    .optional()
    .isString()
    .withMessage("hour_available debe ser una cadena de texto."),
];