import { db } from '../connectSQL'
// INTERFACE
import { IUser } from '../interface/user.interface'

export async function findUser(userId: string): Promise<IUser | null> {
  try {
    const res = await db.one('SELECT * FROM Users WHERE id = $1', [userId])
    console.log({res})
    return res
  } catch (error) {
    console.log(error)
    return null
  }
}