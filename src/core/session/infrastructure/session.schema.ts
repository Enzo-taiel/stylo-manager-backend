import { Schema } from 'mongoose'

export const SessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: false
  },
  clientPhone: {
    type: String,
    required: false
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
})