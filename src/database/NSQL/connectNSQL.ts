import { connect, ConnectOptions } from 'mongoose'
//  VARIABLES
import { DATABSE_NSQL } from '../../config/variables'

const options: ConnectOptions = {
  user: DATABSE_NSQL.DATABSE_NSQL_USER,
  pass: DATABSE_NSQL.DATABASE_NSQL_PASS,
  autoIndex: false
}

connect(DATABSE_NSQL.DATABASE_NSQL_URI, options)
.then(()=> console.log("database is connect."))
.catch(err => new Error(err))