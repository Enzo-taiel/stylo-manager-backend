import { Schema } from 'mongoose';
import { AppointmentsSchema } from '../schemas';

const Appointments_Schema = new Schema(AppointmentsSchema, { timestamps: true });

export { Appointments_Schema }

