import { body } from "express-validator";

export const validateFieldsInsertEmployee = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),

  body("skills")
    .custom((value) => {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error("skills debe ser un array");
      if (!parsed.every((s) => typeof s === "string"))
        throw new Error("cada skill debe ser una cadena");
      return true;
    }),

  body("days_unavailable")
    .custom((value) => {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error("days_unavailable debe ser un array");
      return true;
    }),

  body("hours_unavailable")
    .custom((value) => {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error("hours_unavailable debe ser un array");
      return true;
    }),

  body("info")
    .custom((value) => {
      const parsed = JSON.parse(value);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("info debe ser un objeto");
      }
      if (!parsed.city) throw new Error("city es obligatorio");
      return true;
    }),
];
