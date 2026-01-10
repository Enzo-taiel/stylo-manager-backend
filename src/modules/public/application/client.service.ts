import { withTransaction } from "shared/database/withTransaction";
import { ClientRepository } from "@/core/client/infrastructure/client.repository";
import { IClient } from "@/core/client/domain/client.type";

export class PublicClientService {

  static async createClient(clientData: Partial<IClient>) {
    return withTransaction(async (session) => {
      const client = await ClientRepository.create(clientData, session)
      return client
    })
  }

  static async updateClient(clientId: string, clientData: Partial<IClient>) {
    return withTransaction(async (session) => {
      const client = await ClientRepository.update(clientId, clientData, session)
      return client
    })
  }

  static async findBySessionId(sessionId: string){
    const client = await ClientRepository.findBySessionId(sessionId)
    return client
  }

}