import { body, Meta } from 'express-validator'
import { UsersModel } from '../../database/models/index.model'
import { isMatchPassword } from '../../helpers/jsonwebtoken';

const verifyThatUserExist = async (username: string, { req }: Meta) => {
  const user = await UsersModel.findOne({ username });
  if (!user) throw new Error('El nombre de usuario es incorrecto.');
  req.passwordEncripted = user.password
}

const verifyPassword = async (password: string, { req }: Meta) => {
  const isMatch = await isMatchPassword(password, req.passwordEncripted!)
  if (!isMatch) throw new Error('Contraseña incorrecta.');
  req.passwordEncripted = null
}

// Middleware de validación para el objeto de inicio de sesión
const validateFieldsSignin = [
  // Validation of the username
  body('username')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El nombre de usuario es requerido.")
    .isLength({ min: 5 })
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres')
    .custom(verifyThatUserExist),
  // Validathion of the password 
  body('password')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("La contraseña es requerida.")
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .custom(verifyPassword)
];

export default validateFieldsSignin