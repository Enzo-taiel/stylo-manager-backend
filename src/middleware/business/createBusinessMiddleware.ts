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

const validateFieldsInsertBusiness = [
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

  // openDays: ["domingo", "lunes", ...]
  body("openDays")
    .isArray({ min: 1 }).withMessage("Debes seleccionar al menos un día abierto.")
    .custom((days) => {
      if (!days.every((d: any) => typeof d === "string")) {
        throw new Error("Todos los días deben ser texto.");
      }

      const normalized = days.map((d: string) => d.trim().toLowerCase());

      // Validación: no repetidos
      if (new Set(normalized).size !== normalized.length) {
        throw new Error("No puedes repetir días.");
      }

      // Validación: solo días permitidos
      for (const day of normalized) {
        if (!VALID_DAYS.includes(day)) {
          throw new Error(`"${day}" no es un día válido.`);
        }
      }

      return true;
    }),

  // openTime y closeTime: "HH:mm"
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
];

export default validateFieldsInsertBusiness;