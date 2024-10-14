import { Schema, Document } from 'mongoose'

export interface IEmployee extends Document {
  _id: Schema.Types.ObjectId 
  full_name: string
  avatar_url: string
  skills: String[]
  createdAt: Date
  updateAt: Date
  info: {
    city: string,
    instagramUsername: string
    day_available: string
  }
}