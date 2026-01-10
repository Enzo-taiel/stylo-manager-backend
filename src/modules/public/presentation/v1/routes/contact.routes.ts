import { Router } from 'express';

import { createContactValidation } from '../validation/contact.validation';
import { ResolveDomainMiddleware } from '@/shared/middleware/resolveDomain';
import { CreateContactController } from '../controllers/contact.controller';

export const PublicContactRoutesV1 = Router()

PublicContactRoutesV1.post(
  "/",
  ResolveDomainMiddleware,
  createContactValidation,
  CreateContactController
)