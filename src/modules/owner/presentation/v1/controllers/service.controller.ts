import { OwnerServiceService } from "@/modules/owner/application/service.service"
import { NextFunction, Request, Response } from "express"

export const obtainServicesController = async (req: Request, res: Response, next: NextFunction) => {
  
  const businessId = req.businessId!
  
  try {
    const services = await OwnerServiceService.findServicesByBusiness(businessId)
    return res.status(200).json({
      success: true,
      message: "Services obtain successfully.",
      services
    })
  } catch (error) {
    return next(error)
  }
}