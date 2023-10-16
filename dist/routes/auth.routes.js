"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// CONTROLLERS
const auth_controller_1 = require("../controllers/auth.controller");
const routerAuth = (0, express_1.Router)();
routerAuth.post("/signin", auth_controller_1.SigninController);
routerAuth.post("/signup", auth_controller_1.SignupController);
exports.default = routerAuth;
