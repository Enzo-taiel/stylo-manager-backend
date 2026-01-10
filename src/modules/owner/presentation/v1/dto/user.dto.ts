import { AuthPassword } from "@/core/auth/domain/valueObjects/auth.password.vo"
import { AuthCredential } from "@/core/auth/domain/valueObjects/auth.credential.vo"

export interface UserCreateDTO {
  name: string
  email: AuthCredential
  phone: AuthCredential
  password: AuthPassword
}