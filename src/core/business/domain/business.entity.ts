import { UserRepository } from "@/core/user/infrastructure/user.repository";
import { BusinessCase } from "@/modules/owner/application/business/business.case";
import { BusinessRepository } from "../infrastructure/business.repository";

export interface IBusinessEntity {
  id?: string
  name: string;
  phone: string;
  email: string;
  address: string;
  subdomain: string
  schedule: string;
  category: string;
  openTime: string;
  closeTime: string;
  description: string;
  openDays: Array<String>;
  owner: string
}

export class BusinessEntity {

  constructor(private props: IBusinessEntity) { }

  get id() { return this.props.id }
  get ownerId() { return this.props.owner }
  get category() { return this.props.category }

  async getOwner() {
    const user = await UserRepository.findById(this.props.id!)
    return user
  }

  async updateIcon(icon: any, session: any) {
    const business = await BusinessRepository.updateIcon(this.props.id!, icon, session)
    return business
  }

  toPrimitives() {
    return { ...this.props }
  }

}