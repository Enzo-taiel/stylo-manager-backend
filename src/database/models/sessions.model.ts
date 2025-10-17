import { Schema } from 'mongoose';
import { SessionSchema } from '../schemas'

const Sessions_Schema = new Schema(SessionSchema, { timestamps: true });

export { Sessions_Schema }