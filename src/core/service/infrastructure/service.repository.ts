import { ServiceModel } from "./service.model";
import { IService } from "../domain/service.type";
import mongoose from "mongoose";

export class ServiceRepository {

  static async existService(filter: Partial<IService>) {
    return await ServiceModel.exists(filter)
  }

  static async findAllServiceByBusiness(businessId: string) {
    return await ServiceModel.find({ business: businessId })
      .populate("employee_available")
      .populate("business")
  }

  static async findById(serviceId: string): Promise<IService | null> {
    return await ServiceModel.findById(serviceId)
      .populate("employee_available")
      .populate("business")
  }

  static async createService(serviceData: Partial<IService>, session: mongoose.mongo.ClientSession) {
    const service = new ServiceModel(serviceData)
    await service.save({ session })
    return service
  }

  static async updateService(serviceId: string, serviceData: Partial<IService>, session: mongoose.mongo.ClientSession) {
    return await ServiceModel.findOneAndUpdate({ _id: serviceId }, serviceData).session(session)
  }

  static async deleteService(serviceId: string, session: mongoose.mongo.ClientSession) {
    return await ServiceModel.findByIdAndDelete(serviceId).session(session)
  }

}