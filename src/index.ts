// Server
import WebPush from "web-push";
import { config } from "dotenv";
import { Server } from "./main";
import { ENV } from "@/shared/config/env";

config();

// Configuración de WebPush
WebPush.setVapidDetails(
  `mailto:${ENV.WEB_PUSH.EMAIL}`,
  ENV.WEB_PUSH.PUBLIC_KEY,
  ENV.WEB_PUSH.PRIVATE_KEY
);

// Iniciar el servidor
const server = new Server();
server.startServer();

