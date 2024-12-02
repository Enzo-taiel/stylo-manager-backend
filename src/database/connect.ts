import mongoose from 'mongoose'
//  VARIABLES
import { DATABASE_NSQL } from '../config/variables'

export const connectDB = async () => {

  try {
    await mongoose.connect(String(process.env.MONGODB_URI! + process.env.MONGODB_DB!))
    console.log("Connexion con Mongodb exitosa !")
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza el proceso si no puede conectarse
  }
}