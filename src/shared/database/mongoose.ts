import mongoose from 'mongoose'
import { ENV } from '../config/env'

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DATABASE.URI + ENV.DATABASE.NAME)
    console.log("[Mongodb] Conectado exitosamente ✅")
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); 
  }
}