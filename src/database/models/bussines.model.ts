import { Schema } from 'mongoose';
import { BusinessSchema } from '../schemas';

const Bussines_Schema = new Schema(BusinessSchema, { timestamps: true });

export { Bussines_Schema }

