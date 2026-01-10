import { IUser } from "@/core/user/domain/user.type"
import { UserRepository } from "@/core/user/infrastructure/user.repository"
import { withTransaction } from "@/shared/database/withTransaction"

export class OwnerUserService {

  static async findById(userId: string) {
    try {
      const user = UserRepository.findById(userId)
      return user
    } catch (error) {
      throw error
    }
  }

  static async updateUser(userId: string, userData: Partial<IUser>) {
    return withTransaction(async (session) => {
      const user = await UserRepository.updateUserById(userId, userData, session)
      return user
    })
  }

}