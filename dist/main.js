"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
// CONFIGS
const variables_1 = require("./config/variables");
// MIDDLEWARE
const cors_1 = __importDefault(require("./middleware/cors"));
const morgan_1 = __importDefault(require("./middleware/morgan"));
// ROUTER
const index_routes_1 = require("./routes/index.routes");
class Server {
    APP;
    PORT;
    constructor() {
        this.APP = (0, express_1.default)();
        this.PORT = variables_1.PORT;
    }
    middleware() {
        this.APP.use(cors_1.default);
        this.APP.use(morgan_1.default);
        this.APP.use((0, express_1.json)());
        this.APP.use((0, helmet_1.default)());
    }
    routes() {
        this.APP.use("/api/auth", index_routes_1.routerAuth);
    }
    start_server() {
        this.middleware();
        this.routes();
        this.APP.listen(this.PORT, () => {
            console.log(`Listen server on port ${this.PORT}.`);
        });
    }
}
exports.Server = Server;
