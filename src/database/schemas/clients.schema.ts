import { SchemaDefinition } from 'mongoose'

export const ClientsSchema: SchemaDefinition = {
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: false,
  },
  sessionId: {
    type: String,
    required: true
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
}