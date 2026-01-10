import { Schema, Types } from "mongoose";
import { IClientDocument, IClientModel } from "../domain/client.type";

export const ClientSchema = new Schema<IClientDocument, IClientModel>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true
  },
  session: {
    type: Types.ObjectId,
    ref: "session",
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