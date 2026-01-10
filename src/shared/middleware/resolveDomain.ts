import { BusinessRepository } from "@/core/business/infrastructure/business.repository";
import { NextFunction, Request, Response } from "express";

export const ResolveDomainMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const domain = req.header("x-domain");

  if (!domain) {
    return next({
      httpStatus: 400,
      message: "Domain header missing"
    });
  }

  const business = await BusinessRepository.findBySubdomain(domain)

  if (!business) {
    return next({
      httpStatus: 404,
      message: "Business not found"
    });
  }

  req.businessId = business.id;

  next();
};
