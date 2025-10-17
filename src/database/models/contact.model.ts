import { Schema } from 'mongoose';
import { ContactSchema } from '../schemas'

const Contact_Schema = new Schema(ContactSchema, { timestamps: true });

export { Contact_Schema }