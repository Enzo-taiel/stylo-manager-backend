import mongoose from "mongoose";
import { IPayment } from "../domain/payment.type";
import { PaymentModel } from "./payment.model";


export class PaymentRepository {

  static async create(paymentData: Partial<IPayment>, session: mongoose.mongo.ClientSession) {
    const payment = new PaymentModel(paymentData)
    await payment.save({ session })
    return payment
  }

}