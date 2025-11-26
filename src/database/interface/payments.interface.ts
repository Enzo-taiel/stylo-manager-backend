import { Schema, Document } from 'mongoose'

export interface IPayment extends Document {
  _id: Schema.Types.ObjectId 
  business: Schema.Types.ObjectId
  appointment: Schema.Types.ObjectId
  employee: Schema.Types.ObjectId
  amount: number
  tip: number
  discount: number
  subtotal: number
  method: "cash" | "credit_card" | "debit_card" | "mercadopago" | "transfer"
  status: "unpaid" | "paid_card" | "paid_mp" | "paid_cash" | "paid_transfer" | "pending_online"
  externalId?: string
  last4?: string
  createdAt: Date
  updateAt: Date
}