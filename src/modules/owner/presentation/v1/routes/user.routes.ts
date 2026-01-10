import { Router } from "express";
import { obtainMeController, updateExpoPushTokenController,  } from "../controllers/user.controller";
import { expoPushTokenValidation } from "../validation/user.validation";
import { handleAuthentication } from "@/shared/middleware/authentication";

export const OwnerUserRoutesV1 = Router()

OwnerUserRoutesV1.get(
  "/",
  handleAuthentication,
  obtainMeController
)

OwnerUserRoutesV1.patch(
  "/subscription",
  handleAuthentication,
  expoPushTokenValidation,
  updateExpoPushTokenController
)

