import { body, Meta } from 'express-validator'
import { UsersModel } from '../../database/models/index.models'

const verifyThatUserExist = async (username: string) => {
  const user = await UsersModel.findOne({ username });
  if (user) throw new Error('El nombre de usuario ingresado ya existe.');
}

const verifyThatEmailExist = async (email: string) => {
  const user = await UsersModel.findOne({ email });
  if (user) throw new Error('El email ingresado ya existe.');
}

const verifiMatchPasswordRepiter = async (password_repiter: string, { req }: Meta) => {
  const isMatch = password_repiter === req.body.password
  if (!isMatch) throw new Error('Las contraseñas ingresadas no coinciden.')
}

// Middleware de validación para el objeto de inicio de sesión
const validateFieldsSignup = [
  // Validation of the name
  body('name')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su nombre.")
    .isLength({ min: 3 })
    .withMessage('Ingrese su nombre verdadero.'),
  // Validathion of the last name 
  body('last_name')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su apellido.")
    .isLength({ min: 3 })
    .withMessage('Ingrese su apellido verdadero.'),
  // Validation of the username
  body('username')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese un nombre de usuario.")
    .isLength({ min: 5 })
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres.')
    .custom(verifyThatUserExist),
  // Valitaion of the email
  body('email')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su email.")
    .isEmail()
    .withMessage("Ingrese un email valido.")
    .custom(verifyThatEmailExist),
  // Validation of the business name
  body('business')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese el nombre de su negocio.")
    .isLength({ min: 4 })
    .withMessage('Su nombre de negocio debe tener al menos 4 caracteres.'),
  // Validation of the password
  body('password')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su contraseña.")
    .isLength({ min: 6 })
    .withMessage('Su contraseña debe tener al menos 6 caracteres'),
  // Validation of the password repiter
  body('password_repiter')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Repita su contraseña.")
    .isLength({ min: 6 })
    .withMessage('Su contraseña debe tener al menos 6 caracteres.')
    .custom(verifiMatchPasswordRepiter)
];

export default validateFieldsSignup