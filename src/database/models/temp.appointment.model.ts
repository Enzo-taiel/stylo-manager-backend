import { Schema } from 'mongoose';
// SCHEMAS
import { TempAppointmentsSchema } from '../schemas'

const TempAppointments_Schema = new Schema(TempAppointmentsSchema, { timestamps: true });

export { TempAppointments_Schema }

