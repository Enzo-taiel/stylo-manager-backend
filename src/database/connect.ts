import mongoose from 'mongoose'
//  VARIABLES
import { DATABSE_NSQL } from '../config/variables'

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABSE_NSQL.DATABASE_NSQL_URI + 'stylo-manager')
    console.log("Connexion con Mongodb exitosa !")
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza el proceso si no puede conectarse
  }
}