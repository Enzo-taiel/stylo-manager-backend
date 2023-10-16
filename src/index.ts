// Server
import { Server } from './main';
import "./database/connect";
import { config } from "dotenv";

config();
const server = new Server();
server.start_server();