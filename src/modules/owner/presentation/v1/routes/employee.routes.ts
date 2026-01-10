import { Router } from "express";
import { ResolveDomainMiddleware } from "@/shared/middleware/resolveDomain";
import { handleAuthentication } from "@/shared/middleware/authentication";
import { validateObjectIdInParams } from "@/shared/middleware/validateObjectId";
import { upload } from "@/shared/infrastructure/storage/multer.config";
import { createEmployeeValidation, updateEmployeeValidation } from "@/modules/owner/presentation/v1/validation/employee.validation";
import { createEmployeeController, deleteEmployeeController, obtainEmployeeByIdController, obtainEmployeesController, updateAvatarEmployeeController, updateEmployeeController, updateJobsEmployeeController } from "../controllers/employee.controller";

export const OwnerEmployeeRoutesV1 = Router()

OwnerEmployeeRoutesV1.get("/",
  handleAuthentication,
  obtainEmployeesController
)

OwnerEmployeeRoutesV1.get(
  "/:employeeId",
  handleAuthentication,
  validateObjectIdInParams("employeeId"),
  obtainEmployeeByIdController
)

OwnerEmployeeRoutesV1.post("/",
  handleAuthentication,
  createEmployeeValidation,
  createEmployeeController
)

OwnerEmployeeRoutesV1.delete(
  "/:employeeId",
  handleAuthentication,
  validateObjectIdInParams("employeeId"),
  deleteEmployeeController
)

OwnerEmployeeRoutesV1.put(
  "/:employeeId",
  handleAuthentication,
  validateObjectIdInParams("employeeId"),
  updateEmployeeValidation,
  updateEmployeeController
)

OwnerEmployeeRoutesV1.put(
  "/:employeeId/avatar",
  handleAuthentication,
  validateObjectIdInParams("employeeId"),
  upload.single("avatar"),
  updateAvatarEmployeeController
)

OwnerEmployeeRoutesV1.put(
  "/:employeeId/jobs",
  handleAuthentication,
  validateObjectIdInParams("employeeId"),
  upload.array("jobs", 10),
  updateJobsEmployeeController
)

