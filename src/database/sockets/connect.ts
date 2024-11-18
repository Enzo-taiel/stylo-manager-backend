// socketConfig.ts
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
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO no ha sido inicializado.");
  }
  return io;
}


export default initializeSocket