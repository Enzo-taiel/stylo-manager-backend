import { Schema } from 'mongoose';
// SCHEMAS
import { AppointmentsSchema } from '../schemas'
import { ClientsModel, EmployeesModel } from './index.models';

const Appointments_Schema = new Schema(AppointmentsSchema, { timestamps: true });

export { Appointments_Schema }

