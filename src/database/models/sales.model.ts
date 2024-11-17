import { Schema } from 'mongoose';
// SCHEMAS
import { SalesSchema } from '../schemas'

const Sales_Schema = new Schema(SalesSchema, { timestamps: true });

export { Sales_Schema }