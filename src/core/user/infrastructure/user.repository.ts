import { UserModel } from "./user.model";
import { IUser } from "../domain/user.type";
import { UserEntity } from "../domain/user.entity";
import { AuthCredential } from "@/core/auth/domain/valueObjects/auth.credential.vo";

export interface IUserRepository {
  existUserById(userId: string): Promise<Boolean>
  findById(userId: string): Promise<any>
  updateUserById(user: string, userData: any, session: unknown): Promise<any>
  assignBusinessToUser(userId: string, businessId: string, session: unknown): Promise<any>
}

export const UserRepository = {

  async existUserById(userId: string): Promise<boolean> {
    const user = await UserModel.exists({ _id: userId })
    return !!user
  },

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(userId)
    if (!user) return null
    return new UserEntity({
      id: user._id.toString(),
      name: user.name,
      business: user.business.map(b => b.toString()),
      email: AuthCredential.create(user.email),
      phone: AuthCredential.create(user.phone),
      expoPushToken: user.expoPushToken
    })
  },

  async updateUserById(userId: string, userData: Partial<IUser>, session: any) {
    const userUpdated = await UserModel.findByIdAndUpdate(userId, userData).session(session)
    if (!userUpdated) return null
    return new UserEntity({
      id: userUpdated._id.toString(),
      name: userUpdated.name,
      business: userUpdated.business.map(b => b.toString()),
      email: AuthCredential.create(userUpdated.email),
      phone: AuthCredential.create(userUpdated.phone),
      expoPushToken: userUpdated.expoPushToken
    })
  },

  async assignBusinessToUser(userId: string, businessId: string, session: any) {
    const userUpdated = await UserModel.findByIdAndUpdate(userId, { business: businessId }).session(session);
    if (!userUpdated) return null
    return new UserEntity({
      id: userUpdated._id.toString(),
      name: userUpdated.name,
      business: userUpdated.business.map(b => b.toString()),
      email: AuthCredential.create(userUpdated.email),
      phone: AuthCredential.create(userUpdated.phone),
      expoPushToken: userUpdated.expoPushToken
    })

  }

}