import { Schema } from 'mongoose';
import { BusinessSchema } from '../schemas';

const Business_Schema = new Schema(BusinessSchema, { timestamps: true });

export { Business_Schema }

