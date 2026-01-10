import mongoose from "mongoose";
import { PaymentSchema } from "./payment.schema";
import { IPaymentDocument, IPaymentModel } from "../domain/payment.type";

export const PaymentModel = mongoose.model<IPaymentDocument, IPaymentModel>("payment", PaymentSchema);