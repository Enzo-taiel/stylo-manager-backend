"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABSE_NSQL = exports.JWT = exports.PORT = exports.CORS_ORIGIN = void 0;
exports.CORS_ORIGIN = process.env.SERVER_CLIENT || ["http://localhost"];
exports.PORT = Number(process.env.PORT) || 8080;
exports.JWT = {
    SECRET_KEY: process.env.SECRET_KEY_JWB || "SHHH"
};
exports.DATABSE_NSQL = {
    DATABASE_NSQL_URI: process.env.DATABASE_NSQL_URI || "mongodb://127.0.0.1:27017/API_REST",
    DATABSE_NSQL_USER: process.env.DATABASE_NSQL_USER || "administrator",
    DATABASE_NSQL_PASS: process.env.DATABASE_NSQL_PASS || "administrator"
};
