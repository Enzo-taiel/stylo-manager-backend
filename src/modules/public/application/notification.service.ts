import { ISubscriptionWebPush } from "@/core/client/domain/client.type";
import { ClientRepository } from "@/core/client/infrastructure/client.repository";
import { withTransaction } from "@/shared/database/withTransaction";

export class PublicNotificationService {

  static subscribeClient(clientId: string, subscription: ISubscriptionWebPush) {
    return withTransaction(async (session) => {
      const user = await ClientRepository.update(clientId, { subscription }, session)
      return user
    })

  }

}