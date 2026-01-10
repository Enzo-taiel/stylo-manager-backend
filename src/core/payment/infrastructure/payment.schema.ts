import { Schema, SchemaDefinition } from "mongoose";
import { IPaymentDocument, IPaymentModel } from "../domain/payment.type";

export const PaymentSchema = new Schema<IPaymentDocument, IPaymentModel>({
  business: { type: Schema.Types.ObjectId, ref: "business", required: true },
  appointment: { type: Schema.Types.ObjectId, ref: "appointment", required: true },
  employee: { type: Schema.Types.ObjectId, ref: "employee" },

  amount: { type: Number, required: true }, // monto final
  tip: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },

  method: {
    type: String,
    enum: ["cash", "credit_card", "debit_card", "mercadopago", "transfer"],
    required: true,
  },

  status: {
    type: String,
    enum: ["unpaid", "paid_card", "paid_mp", "paid_cash", "paid_transfer", "pending_online"],
    required: true,
  },

  externalId: { type: String }, // ID de MP / QR / factura / banco
  last4: { type: String }, // para tarjeta

  createdAt: { type: Date, default: Date.now },
})
