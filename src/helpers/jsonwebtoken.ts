import bcrypt from "bcrypt";
import { Types } from 'mongoose'
import * as JWTOKEN from 'jsonwebtoken'
import { SECRET_KEY_JWT } from "../config/variables";

export const createToken = (_id: Types.ObjectId): string => {
  const token = JWTOKEN.sign({ _id }, SECRET_KEY_JWT)
  return token
}

export const decodingToken = (token: string): JWTOKEN.JwtPayload => {
  const payload = JWTOKEN.verify(token, SECRET_KEY_JWT)
  if (typeof payload === 'string') {
    throw new Error('Invalid token');
  }
  return payload
}

export const isMatchPassword = async (textEncripting: string, textCompare: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(textEncripting, textCompare)
  return isMatch
}
