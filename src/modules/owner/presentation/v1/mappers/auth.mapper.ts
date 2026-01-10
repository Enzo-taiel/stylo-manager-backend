import { UserSigninResponseDTO, UserSignupResponseDTO } from "../dto/auth.dto";
import { AuthPassword } from "@/core/auth/domain/valueObjects/auth.password.vo";
import { AuthCredential } from "@/core/auth/domain/valueObjects/auth.credential.vo";

interface INormalizeSignin { credential: string, password: string }
interface IReturnNormalizeSignin { credential: AuthCredential, password: AuthPassword }

interface INormalizeSignup { name: string, email: string, password: string, phone: string }
interface IReturnNormalizeSignup { name: string, email: AuthCredential, password: AuthPassword, phone: AuthCredential }

export class AuthMapper {

  static normalizeSignin(signinData: INormalizeSignin): IReturnNormalizeSignin {
    return {
      credential: AuthCredential.create(signinData.credential),
      password: AuthPassword.create(signinData.password),
    }
  }

  static normalizeSignup(signupData: INormalizeSignup): IReturnNormalizeSignup {
    return {
      name: signupData.name,
      phone: AuthCredential.create(signupData.phone),
      email: AuthCredential.create(signupData.email),
      password: AuthPassword.create(signupData.password),
    }
  }

  static toResponseSignin(signinData: any) {
    delete signinData.password
    return {
      user: signinData.user as UserSigninResponseDTO["user"],
      refreshToken: signinData.refreshToken as UserSigninResponseDTO["refreshToken"],
      accessToken: signinData.accessToken as UserSigninResponseDTO["accessToken"]
    } as UserSigninResponseDTO
  }

  static toResponseSignup(signupData: any) {
    return {
      user: signupData.user as UserSignupResponseDTO["user"],
      refreshToken: signupData.refreshToken as UserSignupResponseDTO["refreshToken"],
      accessToken: signupData.accessToken as UserSignupResponseDTO["accessToken"]
    } as UserSignupResponseDTO
  }

}