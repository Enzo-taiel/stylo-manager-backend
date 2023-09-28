"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Server
const main_1 = require("./main");
// DATABASE CONNECTION
// import './database/NSQL/connectNSQL'
require("./database/SQL/connectSQL");
require('dotenv').config();
const srv = new main_1.Server();
srv.start_server();
srv.middleware();
srv.routes();
