import { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  _id: Schema.Types.ObjectId
  full_name: string
  phone: string
  message: string
}