import { Schema, Document } from 'mongoose'

export interface IClient extends Document {
  _id: Schema.Types.ObjectId,
  name: string,
  phone: string,
  email?: string
}