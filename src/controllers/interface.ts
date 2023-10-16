
export interface RequestSignup {
  name: string
  last_name: string
  username: string
  email: string
  password: string
  password_repiter: string
}

export interface RequestSignin {
  username: string
  password: string
}