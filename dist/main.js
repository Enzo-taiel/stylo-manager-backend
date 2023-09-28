"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
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
        this.APP.use(morgan_1.default);
        this.APP.use(cors_1.default);
    }
    routes() {
        this.APP.use("/api/auth", index_routes_1.routerAuth);
    }
    start_server() {
        this.APP.listen(this.PORT, () => {
            console.log(`Listen server on port ${this.PORT}`);
        });
    }
}
exports.Server = Server;
