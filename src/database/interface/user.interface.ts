import { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  _id: Schema.Types.ObjectId 
  name: string
  last_name: string
  email: string
  username: string
  password: string
  createdAt: Date
  updateAt: Date
}