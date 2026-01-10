import { validateRequest } from "@/shared/middleware/validateRequest";
import { body } from "express-validator";

const VALID_DAYS = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

export const createBusinessValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio.")
    .isString().withMessage("El nombre debe ser un texto."),

  body("phone")
    .trim()
    .notEmpty().withMessage("El teléfono es obligatorio.")
    .isString().withMessage("El teléfono debe ser un texto."),

  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio.")
    .isEmail().withMessage("El email no es válido."),

  body("address")
    .trim()
    .notEmpty().withMessage("La dirección es obligatoria."),

  body("subdomain")
    .trim()
    .notEmpty().withMessage("La dirección es obligatoria."),

  /** ----------------------------
   * openDays (string | array)
   * ACEPTA:
   *   openDays[]=lunes&openDays[]=martes
   *   openDays=lunes,martes
   *   openDays=lunes
   * ----------------------------- */
  body("openDays")
    .custom((value, { req }) => {

      let days: string[] = [];

      // Caso A: viene como array real (openDays[]=lunes)
      if (Array.isArray(value)) {
        days = value;
      }

      // Caso B: viene como string "lunes,martes"
      else if (typeof value === "string") {
        days = value.split(",").map((v) => v.trim());
      }

      // Caso C: invalid
      else {
        throw new Error("Debes enviar la lista de días correctamente.");
      }

      // Normalizar todo a lowercase
      const normalized = days.map(d => d.trim().toLowerCase());

      // Validación: no repetidos
      if (new Set(normalized).size !== normalized.length) {
        throw new Error("No puedes repetir días.");
      }

      // Validación: deben ser días permitidos
      for (const day of normalized) {
        if (!VALID_DAYS.includes(day)) {
          throw new Error(`"${day}" no es un día válido.`);
        }
      }

      // Sobreescribimos el body con los días normalizados
      req.body.openDays = normalized;

      return true;
    }),

  // openTime y closeTime (HH:mm)
  body("openTime")
    .notEmpty().withMessage("La hora de apertura es obligatoria.")
    .matches(/^\d{2}:\d{2}$/)
    .withMessage("El formato debe ser HH:mm (ej: 09:00)."),

  body("closeTime")
    .notEmpty().withMessage("La hora de cierre es obligatoria.")
    .matches(/^\d{2}:\d{2}$/)
    .withMessage("El formato debe ser HH:mm (ej: 20:00).")
    .custom((closeTime, { req }) => {
      const openTime = req.body.openTime;
      if (!openTime) return true;

      const [openH, openM] = openTime.split(":").map(Number);
      const [closeH, closeM] = closeTime.split(":").map(Number);

      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;

      if (closeMinutes <= openMinutes) {
        throw new Error("La hora de cierre debe ser mayor que la hora de apertura.");
      }

      return true;
    }),
  validateRequest
];