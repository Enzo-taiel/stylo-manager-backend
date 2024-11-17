import { Schema, Document } from 'mongoose'
import { IAppointment } from './appointments.interface'

export interface IEmployee extends Document {


  _id: Schema.Types.ObjectId
  full_name: string
  avatar_url: string
  skills: string[]
  createdAt: Date
  updateAt: Date
  appointments: Schema.Types.ObjectId[] | IAppointment[]
  info: {
    city: string,
    instagramUsername: string
    day_available: string
  }
}