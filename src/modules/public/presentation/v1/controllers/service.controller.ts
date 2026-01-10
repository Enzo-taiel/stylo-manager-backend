import { PublicServiceService } from "@/modules/public/application/service.service"
import { NextFunction, Request, Response } from "express"

export const obtainServicesController = (req: Request, res: Response, next: NextFunction) => {
  const businessId = req.businessId

  try {
    const services = PublicServiceService.findServicesByBusinessId(businessId!)
    return res.status(200).json({
      message: "Service obtain successfully.",
      error: false,
      success: true,
      services
    })
  } catch (error) {
    return next(error)
  }

}

export const obtainServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { serviceId } = req.params

  try {
    const service = await PublicServiceService.findServiceById(serviceId)
    return res.status(200).json({
      message: "Service obtain successfully.",
      error: false,
      success: true,
      service
    })
  } catch (error) {
    return next(error)
  }

}
