import { IAppointment } from '@/core/appointment/domain/appointment.type'
import { IBusiness } from '@/core/business/domain/business.type'
import { IEmployee } from '@/core/employee/domain/employee.types'
import { Schema, Model } from 'mongoose'

export type TPaymentStatus = "unpaid" | "paid_card" | "paid_mp" | "paid_cash" | "paid_transfer" | "pending_online"
export type TPaymentMethod = "cash" | "credit_card" | "debit_card" | "mercadopago" | "transfer"

export interface IPaymentBase {
  business: Schema.Types.ObjectId | IBusiness
  appointment: Schema.Types.ObjectId | IAppointment
  employee: Schema.Types.ObjectId | IEmployee
  amount: number
  tip: number
  discount: number
  subtotal: number
  method: TPaymentMethod
  status: TPaymentStatus
  externalId?: string
  last4?: string

}

export interface IPayment extends IPaymentBase {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updateAt: Date
}


export interface PaymentsMethods {
  getServicePrice(): Promise<number>;
}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface PaymentsStatics {
}

/**
 * Query helpers
 */
export interface PaymentsQueryHelpers {
}

export type IPaymentDocument = Document &
  IPayment &
  PaymentsMethods;

export type IPaymentModel = Model<IPaymentDocument, PaymentsQueryHelpers> &
  PaymentsStatics;