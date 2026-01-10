import { Document, Model, Types } from 'mongoose'
import { IBusiness } from '@/core/business/domain/business.type'
import { IEmployee } from '@/core/employee/domain/employee.types'

export interface IServicesBase {
  title: string
  subtitle: string
  price: string
  descriptions: String[]
  price_kids?: string
  duration: string
  business: Types.ObjectId | IBusiness
  employees_available: (Types.ObjectId | IEmployee)[]
}

export interface IService extends IServicesBase {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}


/**
 * Methods (this)
 */
export interface ServiceMethods {
}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface ServiceStatics {
}

/**
 * Query helpers
 */
export interface ServiceQueryHelpers {
}

/**
 * Documento final con métodos
 */
export type IServiceDocument = Document & IService & ServiceMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IServiceModel = Model<IServiceDocument, ServiceQueryHelpers> & ServiceStatics;
