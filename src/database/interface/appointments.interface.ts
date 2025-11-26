import { Schema, Document } from 'mongoose'
import { IClient } from './clients.interface'
import { IServices } from './services.interface'
import { IEmployee } from './employee.interface'
import { IBusiness } from './business.interface'
import { IPayment } from './payments.interface'

export interface IAppointment extends Document {
  _id: Schema.Types.ObjectId,
  service: Schema.Types.ObjectId | IServices
  business: Schema.Types.ObjectId | IBusiness
  employee: Schema.Types.ObjectId | IEmployee
  payment: Schema.Types.ObjectId[] | IPayment[]
  date: string,
  hour: string,
  client: IClient | Schema.Types.ObjectId
  status: "pending" | "confirmed" | "in_service" | "completed" | "cancel_by_client" | "cancel_by_business" | "no_show" | "paid" | "refunded"
  methodPayment: "cash" | "credit_card" | "debit_card" | "mercadopago" | "transfer" 
  paymentStatus: "unpaid" | "paid_card" | "paid_mp" | "paid_cash" | "paid_transfer" | "pending_online"
  sessionId: string
  clientName: string
  clientPhone: string
}