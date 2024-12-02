import { SchemaDefinition } from 'mongoose'

export const ContactSchema: SchemaDefinition = {
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  messages: [
    {
      text: { type: String, required: true }, // Contenido del mensaje
      read: { type: Boolean, default: false }, // Indicador de si está leído o no
      createdAt: { type: Date, default: Date.now }, // Fecha de envío del mensaje
    },
  ],
  sessionId: {
    type: String,
    required: true
  }
}