import { Router } from "express";
import { ResolveDomainMiddleware } from "@/shared/middleware/resolveDomain";
import { validateObjectIdInParams } from "@/shared/middleware/validateObjectId";
import { obtainEmployeeController, obtainEmployeesController } from "../controllers/employee.controller";

export const PublicEmployeeRoutesV1 = Router()

PublicEmployeeRoutesV1.get("/",
  ResolveDomainMiddleware,
  obtainEmployeesController
)

PublicEmployeeRoutesV1.get(
  "/:employeeId",
  ResolveDomainMiddleware,
  validateObjectIdInParams("employeeId"),
  obtainEmployeeController
)

