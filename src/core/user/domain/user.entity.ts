import { AuthPassword } from "@/core/auth/domain/valueObjects/auth.password.vo";
import { AuthCredential } from "@/core/auth/domain/valueObjects/auth.credential.vo";
import { BusinessRepository } from "@/core/business/infrastructure/business.repository";

export interface CreateUserProps {
  name: string
  email: AuthCredential
  phone: AuthCredential
  password: AuthPassword
}

export interface IUserEntity {
  id?: string
  name: string
  email: AuthCredential
  phone: AuthCredential
  business: string[]
  expoPushToken: string | null
  password?: AuthPassword
}

export class UserEntity {

  constructor(private props: IUserEntity) { }

  get id() { return this.props.id }

  static create(props: CreateUserProps) {
    return new UserEntity({
      id: undefined,
      name: props.name,
      email: props.email,
      phone: props.phone,
      password: props.password,
      business: [],
      expoPushToken: null
    })
  }

  static fromPersistence(props: IUserEntity) {
    return new UserEntity(props)
  }

  async getBusiness() {
    const business = await BusinessRepository.getBusinessByUser([this.props.id!])
    return business
  }

  toPrimitives() {
    return { 
      ...this.props, 
      password: this.props.password?.value, 
      email: this.props.email.value,
      phone: this.props.phone.value
    }
  }

}