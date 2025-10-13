import mongoose from 'mongoose'
import "./streams/appointments.stream"
import { DATABASE_NSQL } from '../config/variables'

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_NSQL.DATABASE_NSQL_URI + DATABASE_NSQL.DATABASE_NSQL_DB)
    console.log("Connexion con Mongodb exitosa !")
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza el proceso si no puede conectarse
  }
}