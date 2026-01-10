import { AppointmentModel } from "@/core/appointment/infrastructure/appointment.model";
import { handleInsertDocument, handleUpdateDocument, handleDeleteDocument } from "@/handlers/appointments";
import { Server } from "socket.io";
import { getIO } from "../socket";

const stream = AppointmentModel.watch() 

const OperationType: Record<string, (data: any, io: Server) => Promise<void>> = {
  insert: handleInsertDocument,
  delete: handleDeleteDocument,
  update: handleUpdateDocument,
};

stream.on("change", async (data) => {
  const io = getIO()
  try {
    const handler = OperationType[data.operationType];
    if (handler) await handler(data, io);
    else console.warn(`[ChangeStream] Evento no manejado: ${data.operationType}`);
  } catch (error) {
    console.error("Error handling change stream event:", error);
    io.emit("appointment-error", { message: "Error procesando el cambio en citas" });
  }
});
