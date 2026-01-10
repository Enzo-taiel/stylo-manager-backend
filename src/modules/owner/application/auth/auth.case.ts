import { UserEntity } from "@/core/user/domain/user.entity";
import { UserCreateDTO } from "../../presentation/v1/dto/user.dto";
import { withTransaction } from "@/shared/database/withTransaction";
import { AuthRepository } from "@/core/auth/infrastructure/auth.repository";
import { InputValidationError } from "@/shared/errors/inputValidationError";
import { AuthPassword } from "@/core/auth/domain/valueObjects/auth.password.vo";
import { AuthCredential } from "@/core/auth/domain/valueObjects/auth.credential.vo";
import { createAccessToken, createRefreshToken, isMatchPassword } from "@/shared/security/jwt";

export const AuthCase = {

  async signin(credential: AuthCredential, password: AuthPassword) {
    return withTransaction(async (session) => {
      const userEntity = await AuthRepository.findByCredential(credential, session, true)
      if (!userEntity) throw new InputValidationError({ path: "credential", message: "Credencial invalida." })
      const user = userEntity.toPrimitives()
      const isValidPassword = await isMatchPassword(password.value, user.password!)
      if (!isValidPassword) throw new InputValidationError({ path: "password", message: "Contraseña incorrecta." })
      const businessEntityes = await userEntity.getBusiness()
      const business = businessEntityes[0].toPrimitives()
      const accessToken = createAccessToken(userEntity.id!, business.id)
      const refreshToken = createRefreshToken(userEntity.id!)
      return { user, accessToken, refreshToken }
    })
  },

  async createUser(dto: UserCreateDTO) {
    return withTransaction(async (session) => {
      const userEntity = UserEntity.create(dto)
      const newUser = await AuthRepository.createUser(userEntity, session)
      const accessToken = createAccessToken(newUser.id!)
      const refreshToken = createRefreshToken(newUser.id!)
      const ttlSeconds = 60 * 60 * 24 * 7; // 7 días
      await AuthRepository.storeSaveRefreshToken(newUser.id!, refreshToken, ttlSeconds)
      const user = newUser.toPrimitives()
      return { user, accessToken, refreshToken };
    })
  },

  async signOut(accessToken: string, userId: string) {
    try {
      const decoded = AuthRepository.validAccessToken(accessToken)
      const exp = decoded.exp!;
      const now = Math.floor(Date.now() / 1000);
      const ttlSeconds = Math.max(1, exp - now);
      await AuthRepository.storeSaveRefreshTokenInBlackList(accessToken, ttlSeconds);
      await AuthRepository.storeDeleteRefreshToken(userId);
    } catch (error) {
      throw error
    }
  },

  async createAccessTokenByRefreshToken(refreshToken: string) {
    const decoded = AuthRepository.validRefreshToken(refreshToken)
    const userId = decoded._id

    const storedToken = await AuthRepository.verifyStoreRefreshToken(userId)
    if (!storedToken || storedToken !== refreshToken) {
      throw new Error("Refresh token invalid or revoked")
    }

    const accessToken = createAccessToken(userId);
    return accessToken
  }

}