import { Router } from 'express'
import { handleAuthentication } from '@/shared/middleware/authentication';
import { validateObjectIdInParams } from '@/shared/middleware/validateObjectId';
import { createServiceValidation } from '../validation/service.validation';
import { obtainServicesController } from '../controllers/service.controller';

export const OwnerServiceRoutesV1 = Router()

OwnerServiceRoutesV1.get(
  "/",
  handleAuthentication,
  obtainServicesController,
)

OwnerServiceRoutesV1.post(
  "/",
  handleAuthentication,
  createServiceValidation,
)

OwnerServiceRoutesV1.put(
  "/:serviceId",
  handleAuthentication,
  validateObjectIdInParams("serviceId"),
  createServiceValidation,
)

OwnerServiceRoutesV1.delete(
  "/:serviceId",
  handleAuthentication,
  validateObjectIdInParams("serviceId"),
  createServiceValidation,

)


