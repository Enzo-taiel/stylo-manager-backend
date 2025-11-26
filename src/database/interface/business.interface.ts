import { Document, Schema } from "mongoose"
import { IUser } from "./user.interface"

export interface IBusiness extends Document {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  address: string
  phone: string
  favicon: string
  email?: string
  domain: string
  schedule: string
  openDays: string[]
  category: string
  openTime: string
  closeTime: string
  owner: Schema.Types.ObjectId | IUser
  createdAt: Date
  updatedAt: Date
}