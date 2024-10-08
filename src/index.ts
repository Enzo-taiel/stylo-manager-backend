// Server
import { Server } from './main';
import { config } from "dotenv";
import { connectDB } from './database/connect'

connectDB();
config();
const server = new Server();
server.start_server();