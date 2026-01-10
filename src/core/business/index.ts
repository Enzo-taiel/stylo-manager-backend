import { OwnerBusinessRoutesV1 } from "@/modules/owner/presentation/v1/routes/business.router";
import { PublicBusinessRoutesV1 } from "@/modules/public/presentation/v1/routes/business.routes"

export const OwnerBusinessModule = {
  v1: OwnerBusinessRoutesV1,
};

export const PublicBusinessModule = {
  v1: PublicBusinessRoutesV1
}