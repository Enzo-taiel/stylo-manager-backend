import { Schema } from 'mongoose';
import { PaymentSchema } from '../schemas'

const Payment_Schema = new Schema(PaymentSchema, { timestamps: true });

export { Payment_Schema }