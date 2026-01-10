import { IBusinessEntity } from "@/core/business/domain/business.entity";
import { BusinessCreateDTO, BusinessUpdateDTO } from "../dto/business.dto";

export const BusinessMapper = {

  normalizeCreateBusiness(businessData: any) {
    return {
      name: businessData.name as BusinessCreateDTO["name"],
      phone: businessData.phone as BusinessCreateDTO["phone"],
      email: businessData.email as BusinessCreateDTO["email"],
      owner: businessData.ownerId as BusinessCreateDTO["owner"],
      address: businessData.address as BusinessCreateDTO["address"],
      category: businessData.category as BusinessCreateDTO["category"],
      openTime: businessData.openTime as BusinessCreateDTO["openTime"],
      schedule: businessData.schedule as BusinessCreateDTO["schedule"],
      openDays: businessData.openDays as BusinessCreateDTO["openDays"],
      subdomain: businessData.subdomain as BusinessCreateDTO["subdomain"],
      closeTime: businessData.closeTime as BusinessCreateDTO["closeTime"],
      description: businessData.description as BusinessCreateDTO["description"],
    } as BusinessCreateDTO
  },

  normalizeUpdateBusiness(businessData: any) {
    return {
      name: businessData.name as BusinessUpdateDTO["name"],
      phone: businessData.name as BusinessUpdateDTO["phone"],
      email: businessData.name as BusinessUpdateDTO["email"],
      address: businessData.address as BusinessUpdateDTO["address"],
      category: businessData.category as BusinessUpdateDTO["category"],
      openTime: businessData.openTime as BusinessUpdateDTO["openTime"],
      schedule: businessData.schedule as BusinessUpdateDTO["schedule"],
      openDays: businessData.openDays as BusinessUpdateDTO["openDays"],
      closeTime: businessData.closeTime as BusinessUpdateDTO["closeTime"],
      description: businessData.description as BusinessCreateDTO["description"],
    } as BusinessUpdateDTO
  },

  toResponseCreateBusiness(businessEntity: IBusinessEntity) {
    return {
      name: businessEntity.name as IBusinessEntity["name"],
    } as IBusinessEntity
  }
}