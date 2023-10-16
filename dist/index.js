"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Server
const main_1 = require("./main");
require("./database/connect");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server = new main_1.Server();
server.start_server();
