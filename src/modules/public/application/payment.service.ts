import { IPayment } from "@/core/payment/domain/payment.type";
import { PaymentRepository } from "@/core/payment/infrastructure/payment.repository";
import { withTransaction } from "@/shared/database/withTransaction";



export class PublicPaymentService {

  static async createPayment(paymentData: Partial<IPayment>) {
    return withTransaction(async (session) => {
      const payment = await PaymentRepository.create(paymentData, session)
      return payment
    })

  }

}