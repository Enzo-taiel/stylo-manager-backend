import { Schema, Document } from 'mongoose'

export interface IClient extends Document {
  _id: Schema.Types.ObjectId,
  full_name: string,
  phone: string,
  email?: string
}