import { ISession } from '@/core/session/domain/session.type'
import { Model, Schema } from 'mongoose'

export interface IContactBase {
  fullName: string
  phone: string
  message: string
  session: ISession
}

export interface IContact extends IContactBase {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updateAt: Date
}

export interface ContactMethods {

}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface ContactStatics {
}

/**
 * Query helpers
 */
export interface ContactQueryHelpers {
}

export type IContactDocument = Document & IContact & ContactMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IContactModel = Model<IContactDocument, ContactQueryHelpers> & ContactStatics;