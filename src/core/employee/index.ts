import { OwnerEmployeeRoutesV1 } from "@/modules/owner/presentation/v1/routes/employee.routes";
import { PublicEmployeeRoutesV1 } from "@/modules/public/presentation/v1/routes/employee.routes";


export const OwnerEmployeeModule = {
  v1: OwnerEmployeeRoutesV1,
};

export const PublicEmployeeModule = {
  v1: PublicEmployeeRoutesV1
}