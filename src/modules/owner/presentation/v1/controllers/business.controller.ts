import { Request, Response, NextFunction } from "express";
import { BusinessMapper } from "../mappers/business.mapper";
import { BusinessCase } from "@/modules/owner/application/business/business.case";

export const createBusinessController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = BusinessMapper.normalizeCreateBusiness({ ...req.body, ownerId: req.userId! })
    const businessEntity = await BusinessCase.create(dto)
    return res.status(201).json({
      message: "Business created successfully.",
      business: businessEntity.toPrimitives(),
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const obtainBusinessBySubDomainController = async (req: Request, res: Response, next: NextFunction) => {
  const { subdomain } = req.params
  try {
    const business = await BusinessCase.getBusinessBySubdomain(subdomain);
    if (!business) {
      return next({
        status: 404,
        message: "business not found.",
      });
    }
    return res.status(200).json({
      message: "Business obtained successfully.",
      business: business.toPrimitives(),
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const obtainBusinessByIdController = async (req: Request, res: Response, next: NextFunction) => {

  const { businessId } = req.params

  try {
    const business = await BusinessCase.getByBusinessId(businessId);
    if (!business) {
      return next({
        status: 404,
        message: "business not found.",
      });
    }
    return res.status(200).json({
      message: "Business obtained successfully.",
      business: business.toPrimitives(),
      success: true,
    })
  } catch (error) {
    return next(error)
  }
}

export const updateBusinessIconController = async (req: Request, res: Response, next: NextFunction) => {

  const { businessId } = req.params
  const { favicon } = req.body

  try {
    const business = await BusinessCase.updateFavicon(businessId, favicon);
    if (!business) {
      return next({
        status: 404,
        message: "business not found.",
      });
    }
    return res.status(200).json({
      message: "Business obtained successfully.",
      business: business.toPrimitives(),
      success: true,
    })
  } catch (error) {
    return next(error)
  }
}