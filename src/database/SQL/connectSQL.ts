import pgPromise from 'pg-promise';
// VARIABLE
import { DATABASE_SQL } from '../../config/variables'

// INTERFACE
import { IExtensions } from './interface/protocol'

// CONSULTS
import { findUser } from './consults/user'

// pg-promise initialization options:
const options: pgPromise.IInitOptions<IExtensions> = {
  extend(obj) {
    obj.findUser = findUser
  },
};

let db: pgPromise.IDatabase<{}>;

try {
  const pgp = pgPromise(options);
  db = pgp(`postgres://${DATABASE_SQL.DATABASE_SQL_USERNAME}:${DATABASE_SQL.DATABASE_SQL_PASSWORD}@${DATABASE_SQL.DATABASE_SQL_HOST}:/${DATABASE_SQL.DATABASE_NAME_SQL}`);
  console.log("conexion postgreSQL exitosa.")
} catch (error) {
  console.log(error)
}

export { db }