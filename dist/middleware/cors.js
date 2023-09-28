"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const variables_1 = require("../config/variables");
const allowedOrigins = [variables_1.CORS_ORIGIN];
const HandleOrigin = (origin, cb) => {
    if (allowedOrigins.includes(origin || '')) {
        cb(null, true);
    }
    else {
        cb(new Error('Acceso no autorizado'), false);
    }
};
const cors_options = {
    methods: ["GET", "POST", "HEAD"],
    origin: HandleOrigin,
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    exposedHeaders: 'Authorization',
    maxAge: 3600
};
const corsConfig = (0, cors_1.default)(cors_options);
exports.default = corsConfig;
