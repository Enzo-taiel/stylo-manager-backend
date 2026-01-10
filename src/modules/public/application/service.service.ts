import { IService } from "@/core/service/domain/service.type"
import { ServiceRepository } from "@/core/service/infrastructure/service.repository"

export class PublicServiceService {

  static async findServicesByBusinessId(businessId: string): Promise<IService[] | null> {
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

}