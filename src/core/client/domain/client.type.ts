import { ISession } from '@/core/session/domain/session.type'
import { Model, Types } from 'mongoose'

export interface IClientBase {
  name: string,
  phone: string,
  session: ISession
  subscription: ISubscriptionWebPush
}

export interface ISubscriptionWebPush {
  endpoint: string,
  keys: {
    auth: string
    p256dh: string
  }
}

export interface IClient extends IClientBase {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

/**
 * Methods (this)
 */
export interface ClientMethods {
}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface ClientStatics {
}

/**
 * Query helpers
 */
export interface ClientQueryHelpers {
}

/**
 * Documento final con métodos
 */
export type IClientDocument = Document & IClient & ClientMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IClientModel = Model<IClientDocument, ClientQueryHelpers> & ClientStatics;