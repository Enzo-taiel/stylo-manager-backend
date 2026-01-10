import { UserCreateDTO } from "../dto/user.dto";


export class UserMapper {

  normalizeCreate(userData: any) {
    return {
      name: userData.name as UserCreateDTO["name"],
      email: userData.email as UserCreateDTO["email"],
      phone: userData.phone as UserCreateDTO["phone"]
    } as UserCreateDTO
  }

}