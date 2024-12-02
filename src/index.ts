// Server
import { config } from "dotenv";
import WebPush from "web-push";
import { Server } from "./main";
import { connectDB } from "./database/connect";
import { WEB_PUSH } from "./config/variables";

// Configurar dotenv para cargar las variables de entorno
config();

// Configuración de WebPush
WebPush.setVapidDetails(
  `mailto:${WEB_PUSH.VAPID_EMAIL}`,
  WEB_PUSH.VAPID_PUBLIC_KEY,
  WEB_PUSH.VAPID_PRIVATE_KEY
);

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
const server = new Server();
server.startServer();
