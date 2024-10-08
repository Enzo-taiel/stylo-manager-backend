import { body, Meta } from 'express-validator'
import { UsersModel } from '../../database/models/index.models'

const verifyThatEmployeeExist = async (full_name: string) => {
  const user = await UsersModel.findOne({ full_name });
  if (user) throw new Error('El empleado ya se encuentra establecido.');
}

const validationSkills = (skills: string[], { req }: Meta) => {
  if (!skills.every(skill => typeof skill === 'string')) {
    throw new Error("Todas las habilidades deben ser cadenas de texto.");
  }
  return true;
}

// Middleware de validación para el objeto de inicio de sesión
const validateFieldsInsertEmployee = [
  // Validation of the username
  body('full_name')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El nombre de usuario es requerido.")
    .isLength({ min: 5 })
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres')
    .custom(verifyThatEmployeeExist),
  // Validathion of the password 
  body('skills')
    .isArray()
    .withMessage("Las habilidades deben ser un array.")
    .notEmpty()
    .withMessage("Debes ingresar al menos una habilidad.")
    .custom(validationSkills)
];

export default validateFieldsInsertEmployee