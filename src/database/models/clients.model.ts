import { Schema } from 'mongoose';
// SCHEMAS
import { ServicesSchema } from '../schemas'

const Clients_Schema = new Schema(ServicesSchema, { timestamps: true });

export { Clients_Schema }