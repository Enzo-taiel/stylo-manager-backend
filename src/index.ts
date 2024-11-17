// Server
import { Server } from './main';
import { config } from "dotenv";
import { connectDB } from './database/connect'
import WebPush from 'web-push'

// Variables
import { WEB_PUSH } from './config/variables'

WebPush.setVapidDetails(
  'mailto:enzotaiel118@gmail.com',
  WEB_PUSH.VAPID_PUBLIC_KEY,
  WEB_PUSH.VAPID_PRIVATE_KEY
);

connectDB();
config();
const server = new Server();
server.startServer();