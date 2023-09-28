"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//  VARIABLES
const variables_1 = require("../../config/variables");
const options = {
    user: variables_1.DATABSE_NSQL.DATABSE_NSQL_USER,
    pass: variables_1.DATABSE_NSQL.DATABASE_NSQL_PASS,
    autoIndex: false
};
(0, mongoose_1.connect)(variables_1.DATABSE_NSQL.DATABASE_NSQL_URI, options)
    .then(() => console.log("database is connect."))
    .catch(err => new Error(err));
