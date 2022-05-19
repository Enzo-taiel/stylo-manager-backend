"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Listen Server
const main_1 = require("./main");
require('dotenv').config();
const srv = new main_1.Server();
srv.middleware();
srv.startServer();
