import { IUser } from "@/core/user/domain/user.type"
import { UserRepository } from "@/core/user/infrastructure/user.repository"
import { withTransaction } from "@/shared/database/withTransaction"

export const UserCase = {

  async findById(userId: string) {
    try {
      const userEntity = await UserRepository.findById(userId)
      if (!userEntity) return null
      const businessEntityes = await userEntity.getBusiness()
      const user = userEntity.toPrimitives()
      const business = businessEntityes.map(b => b.toPrimitives())
      return { ...user, business }
    } catch (error) {
      throw error
    }
  },

  async updateUser(userId: string, userData: Partial<IUser>) {
    return withTransaction(async (session) => {
      const user = await UserRepository.updateUserById(userId, userData, session)
      return user
    })
  }

}