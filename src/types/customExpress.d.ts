
import { Request } from 'express';
import { connection, Types } from 'mongoose';
import { IUser } from '../database/interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser | null;
    sessionId: string
    token: string
    userId: Types.ObjectId | null
  }
}