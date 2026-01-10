import { IContact } from "@/core/contact/domain/contact.type";
import { withTransaction } from "@/shared/database/withTransaction";
import { ContactRepository } from "@/core/contact/infrastructure/contact.repository";

export class PublicContactService {

  static async createContact(contactData: Partial<IContact>) {
    return withTransaction(async (session) => {
      const contact = await ContactRepository.createMessage(contactData, session)
      return contact
    })
  }

}