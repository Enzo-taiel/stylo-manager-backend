import mongoose from 'mongoose';
import { body } from 'express-validator';
import { validateRequest } from "@/shared/middleware/validateRequest";

export const createAppointmentValidation = [
  // ✅ serviceId
  body('service')
    .notEmpty()
    .withMessage("El ID del servicio es requerido.")
    .isString()
    .withMessage("El ID del servicio debe ser una cadena de texto.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID del servicio no es un ObjectId válido."),

  // ✅ employeeId
  body('employee')
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
    .isIn(["cash", "credit_card", "debit_card", "mercadopago", "transfer"])
    .withMessage("El método de pago no es válido."),
  validateRequest
];

export const updateAppointmentValidation = [
  // ✅ serviceId
  body('serviceId')
    .isString()
    .withMessage("El ID del servicio debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El ID del servicio es requerido.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID del servicio no es un ObjectId válido."),

  // ✅ employeeId
  body('employeeId')
    .isString()
    .withMessage("El ID del empleado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El ID del empleado es requerido.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID del empleado no es un ObjectId válido."),

  // ✅ clientName
  body('clientName')
    .isString()
    .withMessage("El nombre del cliente debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El nombre del cliente es requerido."),

  // ✅ clientPhone
  body('clientPhone')
    .isString()
    .withMessage("El número de teléfono debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El número de teléfono es requerido.")
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
    .isString()
    .withMessage("La hora debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("La hora es requerida."),

  // ✅ methodPayment
  body('methodPayment')
    .isString()
    .withMessage("El método de pago debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El método de pago es requerido.")
    .isIn(['efectivo', 'tarjeta', 'transferencia'])
    .withMessage("El método de pago no es válido."),
  validateRequest
];


export const updateAppointmentStatus = [
  body("status")
    .notEmpty()
    .withMessage("El estado es requerido.")
    .isString()
    .withMessage("El estado debe ser una cadena de texto.")
    .isIn(["pending", "confirmed", "in_service", "completed", "cancel_by_client", "cancel_by_business", "no_show", "paid", "refunded"])
    .withMessage("El estado no es válido."),
  validateRequest
]