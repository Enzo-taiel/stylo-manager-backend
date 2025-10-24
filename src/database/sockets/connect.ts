import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | undefined;

const initializeSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "OPTION"]
    }
  });
  
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado con id:", socket.id);
    socket.on("disconnect", () => {
      console.log("Cliente desconectado con id:", socket.id);
    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO no ha sido inicializado.");
  }
  return io;
}


export default initializeSocket