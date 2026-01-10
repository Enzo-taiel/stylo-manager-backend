import { ClientSession } from "mongoose";
import { ContactModel } from "./contact.model";
import { IContact } from "../domain/contact.type";

export class ContactRepository {

  static async createMessage(contactData: Partial<IContact>, session: ClientSession){
    const contact = new ContactModel(contactData)
    await contact.save({ session })
    return contact
  }

}