import { Model, Types } from "mongoose"

export interface IEmployeeBase {
  name: string
  avatar: string
  skills: string[]
  createdAt: Date
  updateAt: Date
  appointments: Types.ObjectId[]
  info: IInfoEmployee
  business: Types.ObjectId
  days_unavailable: string[]
  hours_unavailable: string[]
  jobs: string[]
}

export interface IInfoEmployee {
  city: string,
  instagramUsername: string
  day_available: string
}

export interface IEmployee extends IEmployeeBase {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface IEmployeeCreate {
  name: string
  skill: string
  daysUnavailable: string[]
  hoursUnavailable: string[]
  business: string
  info?: IInfoEmployee
  avatar: string
}

/**
 * Methods (this)
 */
export interface EmployeeMethods {

}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface EmployeeStatics {
}

/**
 * Query helpers
 */
export interface EmployeeQueryHelpers {
}


export type IEmployeeDocument = Document & IEmployee & EmployeeMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IEmployeeModel = Model<IEmployeeDocument, EmployeeQueryHelpers> & EmployeeStatics;