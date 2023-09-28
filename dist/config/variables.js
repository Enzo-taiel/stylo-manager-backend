"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_SQL = exports.DATABSE_NSQL = exports.PORT = exports.CORS_ORIGIN = void 0;
exports.CORS_ORIGIN = process.env.SERVER_CLIENT || ["http://localhost"];
exports.PORT = Number(process.env.PORT) || 8080;
exports.DATABSE_NSQL = {
    DATABASE_NSQL_URI: process.env.DATABASE_NSQL_URI || "mongodb://127.0.0.1:27017",
    DATABSE_NSQL_USER: process.env.DATABASE_NSQL_USER || "administrator",
    DATABASE_NSQL_PASS: process.env.DATABASE_NSQL_PASS || "administrator"
};
exports.DATABASE_SQL = {
    DATABASE_SQL_HOST: process.env.DATABASE_NSQL_HOST || "localhost",
    DATABASE_SQL_USERNAME: process.env.DATABASE_SQL_USERNAME || "administrator",
    DATABASE_SQL_PASSWORD: process.env.DATABASE_SQL_PASSWORD || "administrator",
    DATABASE_SQL_PORT: process.env.DATABASE_SQL_PORT || "5432",
    DATABASE_NAME_SQL: process.env.DATABASE_NAME_SQL || "test",
};
