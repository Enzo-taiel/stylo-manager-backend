import mongoose from 'mongoose'
import { body } from 'express-validator'
import { ServiceRepository } from '@/core/service/infrastructure/service.repository';
import { validateRequest } from '@/shared/middleware/validateRequest';

const verifyThatServiceAlreadyExist = async (title: string) => {
  const user = await ServiceRepository.existService({ title })
  if (user) throw new Error('El servicio ya se encuentra establecido.');
}

const validationDescriptions = (skills: string[]) => {
  if (!skills.every(skill => typeof skill === 'string')) {
    throw new Error("Todas las descripciones deben ser cadenas de texto.");
  }
  return true;
}

const validationEmployeesVailable = (employees_vailable: string[]) => {
  if (employees_vailable.length === 0) throw new Error('Ingresa al menos 1 empleado')
  employees_vailable.forEach(id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El empleado no existe');
    }
  });
  return true;
}

// Middleware de validación para el objeto de inicio de sesión
export const createServiceValidation = [
  body('title')
    .notEmpty()
    .withMessage("El titulo del servicio es requerido.")
    .isString()
    .withMessage("El titulo ingresado para el servicio debe ser un string.")
    .custom(verifyThatServiceAlreadyExist),
  body('subtitle')
    .notEmpty()
    .withMessage("Debes ingresar un subtitulo para el servicio.")
    .isString()
    .withMessage("El subtitulo del servicio deben ser un string."),
  body('descriptions')
    .notEmpty()
    .withMessage("Debes ingresar al menos una descripcion del servicio.")
    .isArray()
    .withMessage("Las descripciones del servicio deben estar en un array.")
    .custom(validationDescriptions),
  body('price')
    .notEmpty()
    .withMessage("El precio del servicio es requerido.")
    .isString()
    .withMessage("El precio ingresado para el servicio debe ser una cadena de texto.")
    .isLength({ min: 4 }),
  body('duration')
    .notEmpty()
    .withMessage("La duracion del servicio es requerido.")
    .isString()
    .withMessage("El tiempo para el servicio debe ser una cadena de texto."),
  body('price_kids')
    .isString()
    .withMessage("El precio ingresado debe ser una cadena de texto.")
    .optional()
    .isLength({ min: 4 }),
  body('employees_available')
    .notEmpty()
    .withMessage("Debes ingresar al menos un empleado disponibles para este servicio.")
    .isArray()
    .withMessage("Los empleados del servicio deben estar en un array.")
    .custom(validationEmployeesVailable)
    .withMessage("Cada empleado debe ser un ObjectId válido."),
  validateRequest
];