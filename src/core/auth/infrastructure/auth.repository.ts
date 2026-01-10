import { UserEntity } from "@/core/user/domain/user.entity";
import { UserModel } from "@/core/user/infrastructure/user.model";
import { decodeToken, verifyTokenType } from "@/shared/security/jwt";
import { AuthPassword } from "../domain/valueObjects/auth.password.vo";
import { AuthCredential } from "../domain/valueObjects/auth.credential.vo";
import { InputValidationError } from "@/shared/errors/inputValidationError";

export class AuthRepository {

  static async createUser(entity: UserEntity, session: any): Promise<UserEntity> {
    const primitives = entity.toPrimitives()

    if (await AuthRepository.emailExist(primitives.email, session)) {
      throw new InputValidationError({ path: "email", message: "El email ingresado ya esta en uso." });
    }

    if (await AuthRepository.phoneExist(primitives.phone, session)) {
      throw new InputValidationError({ path: "phone", message: "El numero de telefono ya esta en uso." });
    }

    const [user] = await UserModel.create([primitives], { session })
    return new UserEntity({
      id: user._id.toString(),
      name: user.name,
      email: AuthCredential.create(user.email),
      phone: AuthCredential.create(user.phone),
      expoPushToken: user.expoPushToken,
      business: user.business.map(b => b.toString()),
    })
  }

  static async existUserById(userId: string): Promise<boolean> {
    const existUser = await UserModel.exists({ _id: userId })
    return !!existUser
  }

  static async findById(userId: string, session?: any): Promise<UserEntity | null> {
    const query = UserModel.findById(userId)

    if (session) {
      query.session(session)
    }

    const user = await query.exec()
    if (!user) return null
    return new UserEntity({
      id: user._id.toString(),
      name: user.name,
      email: AuthCredential.create(user.email),
      phone: AuthCredential.create(user.phone),
      expoPushToken: user.expoPushToken,
      business: user.business.map(b => b.toString()),
    })
  }

  static async findByCredential(credential: AuthCredential, session?: any, withPassword?: boolean): Promise<UserEntity | null> {

    const queryObject = credential.type === "email"
      ? { email: credential.value }
      : { phone: credential.value };

    const query = UserModel.findOne(queryObject)

    if (session) {
      query.session(session)
    }

    const user = await query.exec();
    if (!user) return null

    return new UserEntity({
      id: user._id.toString(),
      name: user.name,
      email: AuthCredential.create(user.email),
      phone: AuthCredential.create(user.phone),
      expoPushToken: user.expoPushToken,
      business: user.business.map(b => b.toString()),
      password: withPassword ? AuthPassword.create(user.password) : undefined
    })
  }

  static async storeSaveRefreshToken(userId: string, token: string, ttlSeconds: number) {
    const { redis } = await import("../../../shared/database/redis");
    await redis.set(`refresh:${userId}`, token, "EX", ttlSeconds);
  }

  static async storeSaveRefreshTokenInBlackList(token: string, ttlSeconds: number) {
    const { redis } = await import("../../../shared/database/redis");
    await redis.set(`bl:${token}`, "revoked", "EX", ttlSeconds);
  }

  static async storeDeleteRefreshToken(userId: string) {
    const { redis } = await import("../../../shared/database/redis");
    await redis.del(`refresh:${userId}`);
  } 

  static async verifyAccessTokenIsBlackList(accessToken: string) {
    const { redis } = await import("../../../shared/database/redis");
    return await redis.get(`bl:${accessToken}`);
  }

  static async verifyStoreRefreshToken(userId: string) {
    const { redis } = await import("../../../shared/database/redis");
    return await redis.get(`refresh:${userId}`);
  }

  static async emailExist(email: string, session?: any): Promise<boolean> {
    const existEmail = await UserModel.exists({ email }).session(session ?? null)
    return !!existEmail
  }

  static async phoneExist(phone: string, session?: any) {
    const existPhone = await UserModel.exists({ phone }).session(session ?? null)
    return !!existPhone
  }

  static validAccessToken(accessToken: string) {
    const decoded = decodeToken(accessToken);
    verifyTokenType(decoded, "access");
    return decoded
  }

  static validRefreshToken(refreshToken: string) {
    const decoded = decodeToken(refreshToken);
    verifyTokenType(decoded, "refresh");
    return decoded
  }

}