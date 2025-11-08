import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator'

const validateFieldsInsertBussine = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser un texto."),
  body("phone")
    .notEmpty()
    .withMessage("El teléfono es obligatorio.")
    .isString()
    .withMessage("El teléfono debe ser un texto."),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("El email no es válido."),
  body("address")
    .notEmpty()
    .withMessage("La dirección es obligatoria."),
  body("openDays")
    .isArray({ min: 1 })
    .withMessage("Debes seleccionar al menos un día abierto."),
  body("openTime")
    .notEmpty()
    .withMessage("La hora de apertura es obligatoria.")
    .matches(/^\d{2}:\d{2}$/)
    .withMessage("El formato debe ser HH:mm (ej: 09:00)."),
  body("closeTime")
    .notEmpty()
    .withMessage("La hora de cierre es obligatoria.")
    .matches(/^\d{2}:\d{2}$/)
    .withMessage("El formato debe ser HH:mm (ej: 19:00)."),
];

export default validateFieldsInsertBussine