import { UserRepository } from "@/core/user/infrastructure/user.repository";
import { withTransaction } from "@/shared/database/withTransaction";

export class OwnerNotificationService {

  static subscribeExpo(userId: string, expoPushToken: string) {
    return withTransaction(async (session) => {
      const user = await UserRepository.updateUserById(userId, { expoPushToken }, session)
      return user
    })

  }

}