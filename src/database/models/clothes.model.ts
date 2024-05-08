import mongoose from 'mongoose';

// SCHEMAS
import { ClothesSchema } from '../schemas/clothes.schema'

export const ClothesModel = mongoose.model('clothes', ClothesSchema);