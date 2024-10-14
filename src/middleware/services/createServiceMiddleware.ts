import { body, Meta } from 'express-validator'
import mongoose from 'mongoose'
import { ServicesModel } from '../../database/models/index.models'

const verifyThatServiceAlreadyExist = async (title: string) => {
  const user = await ServicesModel.findOne({ title });
  if (user) throw new Error('El servicio ya se encuentra establecido.');
}

const validationDescriptions = (skills: string[], { req }: Meta) => {
  if (!skills.every(skill => typeof skill === 'string')) {
    throw new Error("Todas las habilidades deben ser cadenas de texto.");
  }
  return true;
}

const validationEmployeesVailable = (employees_vailable: string[], { req }: Meta) => {
  if(employees_vailable.length === 0) throw new Error('Ingresa al menos 1 id')
  employees_vailable.forEach(id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Cada elemento debe ser un ObjectId válido');
    }
  });
  return true;
}

// Middleware de validación para el objeto de inicio de sesión
const validateFieldsCreateService = [
  body('title')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El titulo del servicio es requerido.")
    .isLength({ min: 5 })
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres')
    .custom(verifyThatServiceAlreadyExist),
  body('descriptions')
    .isArray()
    .withMessage("Las habilidades deben ser un array.")
    .notEmpty()
    .withMessage("Debes ingresar al menos una habilidad.")
    .custom(validationDescriptions),
  body('price')
    .isString()
    .withMessage("El precio ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El precio del servicio es requerido.")
    .isLength({ min: 4 }),
  body('price_kids')
    .isString()
    .withMessage("El precio ingresado debe ser una cadena de texto.")
    .optional()
    .isLength({ min: 4 }),
  body('employees_vailable')
    .isArray()
    .notEmpty()
    .withMessage("Debes ingresar un array con ids de trabajadores disponibles para este servicio.")
    .custom(validationEmployeesVailable)
    .withMessage('Cada elemento debe ser un ObjectId válido')
];

export default validateFieldsCreateService