import bcrypt from "bcrypt";
import * as JWTOKEN from 'jsonwebtoken'
import { ENV } from "../config/env";

const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "7d";

export const createAccessToken = (_id: string, business?: string): string => {
  return JWTOKEN.sign({ _id, business, type: "access" }, ENV.SECRET_KEY_JWT, { algorithm: "HS512", expiresIn: ACCESS_TOKEN_EXP });
};

export const createRefreshToken = (_id: string): string => {
  return JWTOKEN.sign({ _id, type: "refresh" }, ENV.SECRET_KEY_JWT, { algorithm: "HS512", expiresIn: REFRESH_TOKEN_EXP });
};

export const decodeToken = (token: string): JWTOKEN.JwtPayload => {
  try {
    const payload = JWTOKEN.verify(token, ENV.SECRET_KEY_JWT, { algorithms: ["HS512"] });
    if (typeof payload === "string") throw new Error()
    return payload;
  } catch (err: any) {
    throw err
  }
};

export const isMatchPassword = async (textEncripting: string, textCompare: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(textEncripting, textCompare)
  return isMatch
}

export const verifyTokenType = (payload: JWTOKEN.JwtPayload, expectedType: "access" | "refresh") => {
  if (payload.type !== expectedType) {
    throw new Error(`Invalid token type: expected ${expectedType}`);
  }
};
