// INTERFACE
import { IUser } from './user.interface'

export interface IExtensions {
  findUser(userId: string): Promise<IUser | null>;
}