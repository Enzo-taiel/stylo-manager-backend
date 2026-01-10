import { Router } from "express";
import { ResolveDomainMiddleware } from "@/shared/middleware/resolveDomain";
import { updateSubscriptionController } from "../controllers/client.controller";

export const PublicClientRoutesV1 = Router()

PublicClientRoutesV1.put(
  "/subscription",
  ResolveDomainMiddleware,
  updateSubscriptionController
)
