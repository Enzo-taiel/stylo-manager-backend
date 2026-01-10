import { body } from "express-validator";

/**
 * ✅ Middleware de validación para CREAR un empleado
 */
export const createEmployeeValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("skills")
    .isArray()
    .withMessage("skills debe ser un array")
    .custom((skills) => {
      if (!skills.every((s: any) => typeof s === "string")) {
        throw new Error("cada skill debe ser una cadena");
      }
      return true;
    }),

  body("days_unavailable")
    .isArray()
    .withMessage("days_unavailable debe ser un array"),

  body("hours_unavailable")
    .isArray()
    .withMessage("hours_unavailable debe ser un array"),

  body("info")
    .isObject()
    .withMessage("info debe ser un objeto")
    .custom((info) => {
      if (!info.city) throw new Error("city es obligatorio");
      return true;
    }),
];


/**
 * ✅ Middleware de validación para ACTUALIZAR un empleado
 */
export const updateEmployeeValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 3 })
    .withMessage("El nombre del empleado debe tener al menos 3 caracteres"),

  body("skills")
    .isArray()
    .withMessage("skills debe ser un array")
    .custom((skills) => {
      if (!skills.every((s: any) => typeof s === "string")) {
        throw new Error("cada skill debe ser una cadena");
      }
      return true;
    }),

  body("days_unavailable")
    .isArray()
    .withMessage("days_unavailable debe ser un array"),

  body("hours_unavailable")
    .isArray()
    .withMessage("hours_unavailable debe ser un array"),

  body("info")
    .isObject()
    .withMessage("info debe ser un objeto")
    .custom((info) => {
      if (!info.city) throw new Error("city es obligatorio");
      return true;
    }),
];
