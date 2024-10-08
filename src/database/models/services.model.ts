import { Schema } from 'mongoose';
// SCHEMAS
import { ServicesSchema } from '../schemas'

const Services_Schema = new Schema(ServicesSchema, { timestamps: true });

export { Services_Schema }