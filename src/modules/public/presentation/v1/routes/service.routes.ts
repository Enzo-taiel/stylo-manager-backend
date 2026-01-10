import { Router } from "express";
import { ResolveDomainMiddleware } from "@/shared/middleware/resolveDomain";
import { validateObjectIdInParams } from "@/shared/middleware/validateObjectId";
import { obtainServiceController, obtainServicesController } from "../controllers/service.controller";

export const PublicServiceRoutesV1 = Router()

PublicServiceRoutesV1.get("/",
  ResolveDomainMiddleware,
  obtainServicesController
)

PublicServiceRoutesV1.get(
  "/:employeeId",
  ResolveDomainMiddleware,
  validateObjectIdInParams("employeeId"),
  obtainServiceController
)

