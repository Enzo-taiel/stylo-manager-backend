import { IUser } from "@/core/user/domain/user.type";

export interface UserSigninDTO {
  credential: string;
  password: string[];
}

export interface UserSigninResponseDTO {
  user: IUser
  refreshToken: string
  accessToken: string
}

export interface UserSignupResponseDTO extends UserSigninResponseDTO {}