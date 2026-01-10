import { BusinessRepository } from "@/core/business/infrastructure/business.repository";
import { Response, Request, NextFunction } from "express"

export const obtainBusinessBySubDomainController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await BusinessRepository.findBySubdomain(req.params.subdomain);
    if (!business) {
      return next({
        status: 404,
        message: "business not found.",
      });
    }
    return res.status(200).json({
      message: "Business obtained successfully.",
      business,
      success: true,
    })
  } catch (error) {
    next(error)
  }
}
