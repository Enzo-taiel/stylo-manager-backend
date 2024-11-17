import { Schema } from 'mongoose';
// SCHEMAS
import { ClientsSchema } from '../schemas'

const Clients_Schema = new Schema(ClientsSchema, { timestamps: true });

export { Clients_Schema }