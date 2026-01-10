import { Model, Types } from "mongoose"

export interface ISessionBase {
  sessionId: string
  clientName: string
  clientPhone: string
}

export interface ISession extends ISessionBase {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

/**
 * Methods (this)
 */
export interface SessionMethods {

}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface SessionStatics {
}

/**
 * Query helpers
 */
export interface SessionQueryHelpers {
}


export type ISessionDocument = Document & ISession & SessionMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type ISessionModel = Model<ISessionDocument, SessionQueryHelpers> & SessionStatics;