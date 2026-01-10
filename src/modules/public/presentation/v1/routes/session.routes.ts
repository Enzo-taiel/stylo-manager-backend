import { Router } from "express";
import { ResolveDomainMiddleware } from "@/shared/middleware/resolveDomain";
import { validateObjectIdInParams } from "@/shared/middleware/validateObjectId";
import { updateSubscriptionController } from "../controllers/session.controller";

export const PublicSessionRoutesV1 = Router()

PublicSessionRoutesV1.put(
  "/:sessionId/subscription",
  ResolveDomainMiddleware,
  validateObjectIdInParams("sessionId"),
  updateSubscriptionController
)
