import { IService, IServiceDocument } from "@/core/service/domain/service.type"
import { ServiceRepository } from "@/core/service/infrastructure/service.repository"
import { withTransaction } from "@/shared/database/withTransaction"

export class OwnerServiceService {

  static async findServicesByBusiness(businessId: string): Promise<IService[] | null> {
    try {
      const services = await ServiceRepository.findAllServiceByBusiness(businessId)
      return services
    } catch (error) {
      throw error
    }
  }

  static async findServiceById(serviceId: string): Promise<IService | null> {
    try {
      const service = await ServiceRepository.findById(serviceId)
      return service
    } catch (error) {
      throw error
    }
  }

  static async createSevice(serviceData: Partial<IService>) {
    return withTransaction<IServiceDocument>(async (session) => {
      const service = await ServiceRepository.createService(serviceData, session)
      return service
    })
  }

  static async updateService(serviceId: string, serviceData: Partial<IService>) {
    return withTransaction<IServiceDocument | null>(async (session) => {
      const service = await ServiceRepository.updateService(serviceId, serviceData, session)
      return service
    })
  }

  static async deleteService(serviceId: string,) {
    return withTransaction<IServiceDocument | null>(async (session) => {
      const service = await ServiceRepository.deleteService(serviceId, session)
      return service
    })
  }

}