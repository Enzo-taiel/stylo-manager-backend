import { BusinessEntity } from "../../../../core/business/domain/business.entity";
import { withTransaction } from "@/shared/database/withTransaction";
import { UserRepository } from "@/core/user/infrastructure/user.repository";
import { BusinessCreateDTO } from "@/modules/owner/presentation/v1/dto/business.dto";
import { BusinessRepository } from "@/core/business/infrastructure/business.repository";

export const BusinessCase = {
  async getByBusinessId(businessId: string) {
    return BusinessRepository.findById(businessId)
  },

  async getBusinessBySubdomain(subdomain: string) {
    return BusinessRepository.findBySubdomain(subdomain)
  },

  async create(dto: BusinessCreateDTO) {
    return withTransaction<BusinessEntity>(async (session) => {
      // Convertimos DTO a entidad de dominio
      const business = new BusinessEntity(dto);

      // Persistimos
      const created = await BusinessRepository.create(business, session);

      // Lógica de dominio: asignar negocio al usuario
      await UserRepository.assignBusinessToUser(created.ownerId, created.id!, session);

      return created;
    })
  },

  async updateFavicon(businessId: string, icon: any) {
    return withTransaction(async (session) => {
      const business = await BusinessRepository.findById(businessId, session)
      if (!business) return null
      const newBusiness = await business.updateIcon(icon, session)
      return newBusiness
    })
  }

}
