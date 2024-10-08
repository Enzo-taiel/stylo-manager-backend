import { Schema, Document } from 'mongoose'

export interface IServices extends Document {
  _id: Schema.Types.ObjectId 
  title: string
  price: string
  descriptions: String[]
  price_kids?: string
  createdAt: Date
  updateAt: Date
}