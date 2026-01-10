import { BusinessModel } from "./business.model";
import { BusinessEntity } from "../domain/business.entity";
import { withTransaction } from "@/shared/database/withTransaction";

export interface IBusinessRepository {
  create(entity: BusinessEntity, session: any): Promise<BusinessEntity>
  findBySubdomain(subdomain: string, session?: any): Promise<BusinessEntity | null>
  findById(businessId: string, session?: any): Promise<BusinessEntity | null>
  getBusinessByUser(userId: Array<String>): Promise<BusinessEntity[]>
  updateIcon(bussinesId: string, icon: any, session: any): Promise<BusinessEntity | null>
}

export const BusinessRepository: IBusinessRepository = {

  async create(entity: BusinessEntity, session: unknown): Promise<BusinessEntity> {
    const primitives = entity.toPrimitives()
    const [doc] = await BusinessModel.create([primitives], { session })
    return new BusinessEntity({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      category: doc.category,
      openDays: doc.openDays,
      openTime: doc.openTime,
      schedule: doc.schedule,
      closeTime: doc.closeTime,
      subdomain: doc.subdomain,
      description: doc.description,
      owner: doc.owner.toString()
    })
  },

  async findBySubdomain(subdomain, session) {
    const business = await BusinessModel.findOne({ subdomain }).session(session ?? null)
    if (!business) return null
    return new BusinessEntity({
      id: business._id.toString(),
      name: business.name,
      email: business.email,
      phone: business.phone,
      address: business.address,
      category: business.category,
      openDays: business.openDays,
      openTime: business.openTime,
      schedule: business.schedule,
      closeTime: business.closeTime,
      subdomain: business.subdomain,
      description: business.description,
      owner: business.owner.toString()
    })
  },

  async findById(businessId, session?) {
    const business = await BusinessModel.findById(businessId).session(session ?? null)
    if (!business) return null
    const businessEntityData = { ...business, owner: business._id.toString() }
    const businessEntity = new BusinessEntity(businessEntityData)
    return businessEntity
  },

  async getBusinessByUser(userId) {
    const business = await BusinessModel.find({ owner: userId })
    if (!business.length) return []
    const businessEntityes = business.map((doc) => new BusinessEntity({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      category: doc.category,
      openDays: doc.openDays,
      openTime: doc.openTime,
      schedule: doc.schedule,
      closeTime: doc.closeTime,
      subdomain: doc.subdomain,
      description: doc.description,
      owner: doc.owner.toString()
    }))
    return businessEntityes
  },

  async updateIcon(businessId, icon) {
    const business = await BusinessModel.findByIdAndUpdate(businessId, { icon })
    if (!business) return null
    const businessEntityData = { ...business, owner: business._id.toString() }
    const businessEntity = new BusinessEntity(businessEntityData)
    return businessEntity
  }

}
