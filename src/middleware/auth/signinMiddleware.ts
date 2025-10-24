import { body, Meta } from 'express-validator'
import { UsersModel } from '../../database/models/index.model'
import { isMatchPassword } from '../../helpers/jsonwebtoken';

const verifyThatUserExist = async (credential: string, { req }: Meta) => {
  const user = await UsersModel.findOne({ $or: [{ email: credential }, { phone: credential }] });
  if (!user) throw new Error('Su usuario no existe.');
  req.passwordEncripted = user.password
}

const verifyPassword = async (password: string, { req }: Meta) => {
  const isMatch = await isMatchPassword(password, req.passwordEncripted!)
  if (!isMatch) throw new Error('Su contraseña es incorrecta.');
  req.passwordEncripted = null
}

// Middleware de validación para el objeto de inicio de sesión
const validateFieldsSignin = [
  // Validation of the username
  body('credential')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Su credencial es requerida.")
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