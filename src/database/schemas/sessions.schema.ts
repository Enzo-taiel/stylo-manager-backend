import { SchemaDefinition } from 'mongoose'

export const SessionSchema: SchemaDefinition = {
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  clientName: {
    type: String
  },
  clientPhone: {
    type: String
  },
  subscription: {
    endpoint: {
      type: String,
      require: false
    },
    keys: {
      auth: {
        type: String,
        require: false
      },
      p256dh: {
        type: String,
        require: false
      }
    }
  }
};