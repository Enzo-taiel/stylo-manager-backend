import { Router } from 'express';
import {
  createBusinessController, obtainBusinessBySubDomainController,
  obtainBusinessByIdController
} from '../controllers/business.controller';

import { handleAuthentication } from '@/shared/middleware/authentication';
import { ResolveDomainMiddleware } from '@/shared/middleware/resolveDomain';
import { validateObjectIdInParams } from '@/shared/middleware/validateObjectId';
import { createBusinessValidation } from '@/modules/owner/presentation/v1/validation/business.validator';

export const OwnerBusinessRoutesV1 = Router()

OwnerBusinessRoutesV1.get(
  "/",
  ResolveDomainMiddleware,
  obtainBusinessBySubDomainController 
)

OwnerBusinessRoutesV1.get(
  "/:businessId",
  handleAuthentication,
  validateObjectIdInParams("businessId"),
  obtainBusinessByIdController
)

OwnerBusinessRoutesV1.post(
  "/",
  handleAuthentication,
  createBusinessValidation,
  createBusinessController
)

OwnerBusinessRoutesV1.put(
  "/:businessiD",
  handleAuthentication,
  createBusinessController
)
