import { Schema, Document } from 'mongoose'
import { IServices } from './services.interface'
import { IEmployee } from './employee.interface'
import { IClient } from './clients.interface'

export interface IAppointment extends Document {
  _id: Schema.Types.ObjectId,
  service: Schema.Types.ObjectId | IServices
  date: string,
  hour: string,
  employee: Schema.Types.ObjectId | IEmployee
  client: IClient | Schema.Types.ObjectId
  status: string
}