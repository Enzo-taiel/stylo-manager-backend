import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose';

// CONFIG
import { DATABSE_NSQL } from '../config/variables'

const connectToDatabase = (req: Request, _res: Response, next: NextFunction) => {
  const businessName = req.businessName;  

  const connection = mongoose.createConnection(DATABSE_NSQL.DATABASE_NSQL_URI + businessName);

  req.dbClient = connection;
  next();
};


export default connectToDatabase