"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//  VARIABLES
const variables_1 = require("../config/variables");
try {
    (0, mongoose_1.connect)(variables_1.DATABSE_NSQL.DATABASE_NSQL_URI);
    console.log("database is connect.");
}
catch (error) {
    new Error(String(error));
}
