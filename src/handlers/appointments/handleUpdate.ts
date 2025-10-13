import { Server } from "socket.io";
import { AppointmentsModel } from "../../database/models/index.models";

export const handleUpdateDocument = async (data: any, io: Server) => {
  const document = data.documentKey
  const appointment = await AppointmentsModel.findById(document)
    .populate("service")
    .populate("employee")
    .populate("client")
  io.emit("update-appointment", appointment)
};
