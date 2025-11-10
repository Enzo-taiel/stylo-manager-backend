import bcrypt from "bcrypt";
import { Types } from 'mongoose'
import * as JWTOKEN from 'jsonwebtoken'
import { SECRET_KEY_JWT } from "../config/variables";

const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "7d";

export const createAccessToken = (_id: Types.ObjectId): string => {
  return JWTOKEN.sign({ _id, type: "access" }, SECRET_KEY_JWT, { algorithm: "HS512", expiresIn: ACCESS_TOKEN_EXP });
};

export const createRefreshToken = (_id: Types.ObjectId): string => {
  return JWTOKEN.sign({ _id, type: "refresh" }, SECRET_KEY_JWT, { algorithm: "HS512", expiresIn: REFRESH_TOKEN_EXP });
};

export const decodeToken = (token: string): JWTOKEN.JwtPayload => {
  const payload = JWTOKEN.verify(token, SECRET_KEY_JWT, { algorithms: ["HS512"] });
  if (typeof payload === "string") throw new Error("Invalid token");
  return payload;
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
