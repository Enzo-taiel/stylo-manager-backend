import { Model, Types } from "mongoose"
import { IBusiness } from "../../business/domain/business.type"

export interface IUserBase {
  name: string
  email: string
  phone: string
  password: string
  business: (Types.ObjectId | IBusiness)[]
  expoPushToken: string | null
}

export interface IUser extends IUserBase {
  _id: Types.ObjectId
  createdAt: Date
  updateAt: Date
}

export interface IUserCreate {
  name: string
  email: string
  phone: string
  password: string
  passwordRepiter: string
}

/**
 * Methods (this)
 */
export interface UserMethods {
}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface UserStatics {
}

/**
 * Query helpers
 */
export interface UserQueryHelpers {
}


export type IUserDocument = Document & IUser & UserMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IUserModel = Model<IUserDocument, UserQueryHelpers> & UserStatics;