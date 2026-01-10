import { ClientSession } from "mongoose";
import { IClient } from "../domain/client.type";
import { ClientModel } from "./client.model";

export class ClientRepository {

  static async create(clientData: Partial<IClient>, session: ClientSession) {
    const client = new ClientModel(clientData)
    await client.save({ session })
    return client
  }

  static async update(sessionId: string, clientData: Partial<IClient>, session: ClientSession) {
    return await ClientModel.findOneAndUpdate({ session: sessionId }, clientData).session(session)
  }

  static async findBySessionId(sessionId: string, opts?: { session: ClientSession }) {
    return await ClientModel.findOne({ session: sessionId }).session(opts?.session ?? null)
  }

}