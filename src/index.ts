// Server
import WebPush from "web-push";
import { config } from "dotenv";
import { Server } from "./main";
import { WEB_PUSH } from "./config/variables";

config();

// Configuración de WebPush
WebPush.setVapidDetails(
  `mailto:${WEB_PUSH.VAPID_EMAIL}`,
  WEB_PUSH.VAPID_PUBLIC_KEY,
  WEB_PUSH.VAPID_PRIVATE_KEY
);

// Iniciar el servidor
const server = new Server();
server.startServer();

