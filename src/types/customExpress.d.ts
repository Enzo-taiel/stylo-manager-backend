
import { Request } from 'express';
import { connection, Types } from 'mongoose';
import { IUser } from '../database/interface';

declare module 'express-serve-static-core' {
  interface Request {
    businessName: string | null;
    dbClient: connection;
    dbAdmin: connection;
    userAdmin: IUser | null;
    passwordEncripted: string | null
    sessionId: string
  }
}