import { connect } from 'mongoose'
//  VARIABLES
import { DATABSE_NSQL } from '../config/variables'

try {
  connect(DATABSE_NSQL.DATABASE_NSQL_URI)
  console.log("database is connect.")
} catch (error) {
  new Error(String(error))
}
