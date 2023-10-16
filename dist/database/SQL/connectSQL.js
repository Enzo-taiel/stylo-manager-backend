"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
// VARIABLE
const variables_1 = require("../../config/variables");
// CONSULTS
const user_1 = require("./consults/user");
// pg-promise initialization options:
const options = {
    extend(obj) {
        obj.signinUser = user_1.signinUser;
    },
};
let db;
try {
    const pgp = (0, pg_promise_1.default)(options);
    exports.db = db = pgp(`postgres://${variables_1.DATABASE_SQL.DATABASE_SQL_USERNAME}:${variables_1.DATABASE_SQL.DATABASE_SQL_PASSWORD}@${variables_1.DATABASE_SQL.DATABASE_SQL_HOST}:/${variables_1.DATABASE_SQL.DATABASE_NAME_SQL}`);
    console.log("conexion postgreSQL exitosa.");
}
catch (error) {
    console.log({});
}
