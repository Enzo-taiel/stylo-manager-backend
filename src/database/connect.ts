import { createConnection } from 'mongoose'
//  VARIABLES
import { DATABSE_NSQL } from '../config/variables'

const databaseAuth = createConnection(DATABSE_NSQL.DATABASE_NSQL_URI + 'aidyfa')

export { databaseAuth }