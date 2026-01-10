import { Router } from "express";
import { handleAuthentication } from "@/shared/middleware/authentication";
import { logoutController, refreshTokenController, signinController, signupController } from "../controllers/auth.controller";
import { refreshTokenValidation, signinValidation, signupValidation } from "@/modules/owner/presentation/v1/validation/auth.validation";

export const OwnerAuthRoutesV1 = Router()

OwnerAuthRoutesV1.post("/signin", signinValidation, signinController)
OwnerAuthRoutesV1.post("/signup", signupValidation, signupController)
OwnerAuthRoutesV1.post("/logout", handleAuthentication, logoutController)
OwnerAuthRoutesV1.post("/refresh", refreshTokenValidation, refreshTokenController)