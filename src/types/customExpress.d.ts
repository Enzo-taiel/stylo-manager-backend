// custom.d.ts

import { Request } from 'express';
import { connection } from 'mongoose'

import { IUser } from '../database/interface'

// Extiende la interfaz Request de Express
declare module 'express-serve-static-core' {
  interface Request {
    businessName: string | null;
    dbClient: connection;
    dbAdmin: connection;
    userAdmin: IUser | null;
    passwordEncripted: string | null
  }
}
