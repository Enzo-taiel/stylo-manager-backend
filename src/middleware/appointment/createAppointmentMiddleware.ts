import { body } from 'express-validator';
import mongoose from 'mongoose';

const validateFieldsInsertAppintments = [
  // ✅ serviceId
  body('serviceId')
    .notEmpty()
    .withMessage("El ID del servicio es requerido.")
    .isString()
    .withMessage("El ID del servicio debe ser una cadena de texto.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID del servicio no es un ObjectId válido."),

  // ✅ employeeId
  body('employeeId')
    .notEmpty()
    .withMessage("El ID del empleado es requerido.")
    .isString()
    .withMessage("El ID del empleado debe ser una cadena de texto.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID del empleado no es un ObjectId válido."),

  // ✅ clientName
  body('clientName')
    .notEmpty()
    .withMessage("El nombre del cliente es requerido.")
    .isString()
    .withMessage("El nombre del cliente debe ser una cadena de texto."),

  // ✅ clientPhone
  body('clientPhone')
    .notEmpty()
    .withMessage("El número de teléfono es requerido.")
    .isString()
    .withMessage("El número de teléfono debe ser una cadena de numeros.")
    .matches(/^[0-9\s+()-]+$/)
    .withMessage("El número de teléfono contiene caracteres inválidos.")
    .isLength({ min: 10, max: 11 })
    .withMessage("El número de teléfono debe tener entre 6 y 20 caracteres."),

  // ✅ date
  body('date')
    .notEmpty()
    .withMessage("La fecha es requerida.")
    .isString()
    // .isISO8601()
    .withMessage("La fecha debe tener un formato válido (ISO 8601)."),

  // ✅ hour
  body('hour')
    .notEmpty()
    .withMessage("La hora es requerida.")
    .isString()
    .withMessage("La hora debe ser una cadena de texto."),

  // ✅ methodPayment
  body('methodPayment')
    .notEmpty()
    .withMessage("El método de pago es requerido.")
    .isString()
    .withMessage("El método de pago debe ser una cadena de texto.")
    .isIn(['efectivo', 'tarjeta', 'transferencia'])
    .withMessage("El método de pago no es válido."),
];

export default validateFieldsInsertAppintments;
