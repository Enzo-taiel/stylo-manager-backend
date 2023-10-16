import { Schema } from 'mongoose'
import * as JWTOKEN from 'jsonwebtoken'
import bcrypt from "bcrypt";

import { JWT } from '../config/variables'

export const createToken = (_id: Schema.Types.ObjectId): string => {
  const token = JWTOKEN.sign({ _id }, JWT.SECRET_KEY)
  return token
}

export const decodingToken = (token: string): string | JWTOKEN.JwtPayload => {
  const payload = JWTOKEN.verify(token, JWT.SECRET_KEY)
  return payload
}

export const isMatchPassword = async (textEncripting: string, textCompare: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(textEncripting, textCompare)
  return isMatch
}
