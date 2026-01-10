import mongoose, { Document, Model, Types } from 'mongoose'
// import { IClient } from './clients.interface'
import { IService } from '../../service/domain/service.type'
import { IEmployee } from '@/core/employee/domain/employee.types'
import { IBusiness } from '@/core/business/domain/business.type'
import { IPayment } from '@/core/payment/domain/payment.type'

export type TAppointmentStatus = "pending" | "confirmed" | "in_service" | "completed" | "cancel_by_client" | "cancel_by_business" | "no_show" | "paid" | "refunded"
export type TAppointmentMethodPayment = "cash" | "credit_card" | "debit_card" | "mercadopago" | "transfer"
export type TAppointmentPaymentStatus = "unpaid" | "paid_card" | "paid_mp" | "paid_cash" | "paid_transfer" | "pending_online"

export interface IAppointment {
  _id: Types.ObjectId,
  service: Types.ObjectId
  business: Types.ObjectId
  employee: Types.ObjectId
  payments: Array<Types.ObjectId>
  date: string,
  hour: string,
  // client: IClient
  status: TAppointmentStatus
  methodPayment: TAppointmentMethodPayment
  paymentStatus: TAppointmentPaymentStatus
  session: string
  clientName: string
  clientPhone: string
}

/**
 * Methods (this)
 */
export interface AppointmentMethods {
  updateStatus(status: TAppointmentStatus, session: mongoose.mongo.ClientSession): Promise<void>
}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface AppointmentStatics {
}

/**
 * Query helpers
 */
export interface AppointmentQueryHelpers {
  findAppointmentsBySession(sessionId: Types.ObjectId): Promise<IAppointment[] | []>
}

/**
 * Documento final con métodos
 */
export type IAppointmentDocument = Document &
  IAppointment &
  AppointmentMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IAppointmentModel = Model<IAppointmentDocument, AppointmentQueryHelpers> &
  AppointmentStatics;
