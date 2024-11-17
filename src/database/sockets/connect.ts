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

  console.log("socket.io !!")

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Aquí puedes manejar eventos específicos de Socket.IO
    socket.on("message", (data) => {
      console.log("Mensaje recibido:", data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
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