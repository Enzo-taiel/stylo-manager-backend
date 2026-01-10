import { Router } from 'express';

import { ResolveDomainMiddleware } from '@/shared/middleware/resolveDomain';
import { obtainBusinessBySubDomainController } from '../controllers/business.controller';

export const PublicBusinessRoutesV1 = Router()

PublicBusinessRoutesV1.get(
  "/",
  ResolveDomainMiddleware,
  obtainBusinessBySubDomainController
)