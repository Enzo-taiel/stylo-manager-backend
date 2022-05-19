"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
// MIDDLEWARE
const cors_1 = __importDefault(require("./middleware/cors"));
const morgan_1 = __importDefault(require("./middleware/morgan"));
class Server {
    app;
    PORT;
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = Number(process.env.PORT);
    }
    middleware() {
        this.app.use(morgan_1.default);
        this.app.use(cors_1.default);
    }
    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Listen server on port ${this.PORT}`);
        });
    }
}
exports.Server = Server;
