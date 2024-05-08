// Server
import { Server } from './main';
import { config } from "dotenv";

config();
const server = new Server();
server.start_server();