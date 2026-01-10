import { OwnerServiceRoutesV1 } from "@/modules/owner/presentation/v1/routes/service.routes";
import { PublicServiceRoutesV1 } from "@/modules/public/presentation/v1/routes/service.routes";

export const OwnerServiceModule = {
  v1: OwnerServiceRoutesV1,
};

export const PublicServiceModule = {
  v1: PublicServiceRoutesV1
}
