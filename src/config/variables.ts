export const CORS_ORIGIN = process.env.SERVER_CLIENT || ["http://localhost"]
export const PORT = Number(process.env.PORT) || 8080
export const BUSINESS = process.env.BUSINESS || ["tuestilo"]
export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT || "SHHH"

export const DATABSE_NSQL = {
  DATABASE_NSQL_URI: process.env.DATABASE_NSQL_URI || "mongodb://127.0.0.1:27017/",
  DATABSE_NSQL_USER: process.env.DATABASE_NSQL_USER || "administrator",
  DATABASE_NSQL_PASS: process.env.DATABASE_NSQL_PASS || "administrator"
}