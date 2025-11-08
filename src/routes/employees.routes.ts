import { Request, Router } from 'express'
import HandleAutentification from '../middleware/authentification'
import { DeleteEmployeeController } from '../controllers/employees/delete.controller'
import { validateFieldsInsertEmployee } from '../middleware/employees/createEmployeeMiddleware'
import { validateFieldsUpdateEmployee } from '../middleware/employees/updateEmployeeMiddleware'

import { ObtainAllEmployeesController, CreateEmployeeController, ObtainEmployeeByIdController, UpdateEmployeeController } from '../controllers/employees'
import { upload } from '../helpers/multer'
import { identifyBusinessWebOnly } from '../middleware/business/identifyBusiness'

const routerEmployees = Router()

routerEmployees.get("/obtain/all", identifyBusinessWebOnly, ObtainAllEmployeesController)
routerEmployees.get("/obtain/:employeeId", identifyBusinessWebOnly, ObtainEmployeeByIdController)

routerEmployees.post("/create",
  HandleAutentification,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "jobs", maxCount: 10 },
  ]),
  validateFieldsInsertEmployee,
  CreateEmployeeController
)
routerEmployees.delete("/delete/:employeeId", HandleAutentification, DeleteEmployeeController)
routerEmployees.put("/update/:employeeId",
  HandleAutentification,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "jobs", maxCount: 10 },
  ]),
  validateFieldsUpdateEmployee,
  UpdateEmployeeController
)

export default routerEmployees