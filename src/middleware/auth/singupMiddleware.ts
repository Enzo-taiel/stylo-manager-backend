import { body, Meta } from 'express-validator'
import { UsersModel } from '../../database/models/index.model'

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

const validateFieldsSignup = [
  body('userName')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su nombre.")
    .isLength({ min: 3 })
    .withMessage('Ingrese su nombre verdadero.'),
  body('userPhone')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese un nombre de usuario.")
    .isLength({ min: 9 }),
  body('userEmail')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su email.")
    .isEmail()
    .withMessage("Ingrese un email valido.")
    .custom(verifyThatEmailExist),
  body('password')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Ingrese su contraseña.")
    .isLength({ min: 6 })
    .withMessage('Su contraseña debe tener al menos 6 caracteres'),
  body('passwordRepiter')
    .isString()
    .withMessage("El valor ingresado debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("Repita su contraseña.")
    .isLength({ min: 6 })
    .withMessage('Su contraseña debe tener al menos 6 caracteres.')
    .custom(verifiMatchPasswordRepiter)

  // body('bussineName')
  //   .isString()
  //   .withMessage("El valor ingresado debe ser una cadena de texto.")
  //   .notEmpty()
  //   .withMessage("Ingrese el nombre de su negocio."),

  // body("bussineAddres")
  //   .notEmpty()
  //   .withMessage("Ingrese su direccion del local.")
  //   .isString()
  //   .withMessage("La dirección debe ser un texto"),

  // body("bussinePhone")
  //   .notEmpty()
  //   .withMessage("Ingrese el teléfono del local.")
  //   .isString()
  //   .withMessage("El teléfono debe ser un texto"),

  // body("bussineEmail")
  //   .notEmpty()
  //   .withMessage("Ingrese el email del local.")
  //   .isEmail()
  //   .withMessage("Ingrese un email valido."),
];

export default validateFieldsSignup