import { body, Meta } from "express-validator";

/**
 * 🔹 Sanitizer: parsea arrays que vienen en string (ej. '["a","b"]') a Array real.
 */
const parseArray = (value: any) => {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      throw new Error("Formato de array inválido.");
    }
  }
  return value;
};

/**
 * 🔸 Valida que las habilidades sean un array de strings.
 */
const validationSkills = (skills: string[], { req }: Meta) => {
  if (!Array.isArray(skills)) throw new Error("Las habilidades deben ser un array.");
  if (!skills.every(skill => typeof skill === "string")) {
    throw new Error("Todas las habilidades deben ser cadenas de texto.");
  }
  return true;
};

/**
 * 🔸 Valida que cualquier array contenga solo strings.
 */
const validateStringArray = (arr: string[], fieldName: string) => {
  if (!Array.isArray(arr)) {
    throw new Error(`${fieldName} debe ser un array.`);
  }
  if (!arr.every(item => typeof item === "string")) {
    throw new Error(`Todos los elementos de ${fieldName} deben ser cadenas de texto.`);
  }
  return true;
};

/**
 * 🧰 Helper reutilizable para arrays stringifyados.
 */
const arrayField = (field: string, customValidator?: (arr: any, meta: Meta) => boolean) => {
  const chain = body(field)
    .optional()
    .customSanitizer(parseArray)
    .isArray()
    .withMessage(`${field} debe ser un array.`);

  if (customValidator) return chain.custom(customValidator);
  return chain.custom(arr => validateStringArray(arr, field));
};

/**
 * ✅ Middleware de validación para ACTUALIZAR un empleado
 */
export const validateFieldsUpdateEmployee = [
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 3 })
    .withMessage("El nombre del empleado debe tener al menos 3 caracteres"),

  body("avatar_url")
    .optional()
    .isString()
    .withMessage("La URL del avatar debe ser una cadena de texto."),

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

  // 🧠 Validaciones para info
  body("info")
    .custom((value) => {
      const parsed = JSON.parse(value);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("info debe ser un objeto");
      }
      return true;
    }),
];
