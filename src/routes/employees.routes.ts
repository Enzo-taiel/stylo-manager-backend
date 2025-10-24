import { Router } from 'express'
import HandleAutentification from '../middleware/authentification'
import { DeleteEmployeeController } from '../controllers/employees/delete.controller'
import { validateFieldsInsertEmployee } from '../middleware/employees/createEmployeeMiddleware'
import { validateFieldsUpdateEmployee } from '../middleware/employees/updateEmployeeMiddleware'

import { ObtainAllEmployeesController, CreateEmployeeController, ObtainEmployeeByIdController, UpdateEmployeeController } from '../controllers/employees'

const routerEmployees = Router()
// VALIDAR QUE EL CLIENTE QUE ESTA PIDIENDO LOS EMPLOYEES 
// ESTE AUTHORIZADO O SEA DE UNA FUENTE CONFIABLE
routerEmployees.get("/obtain/all", ObtainAllEmployeesController)
routerEmployees.get("/obtain/:employeeId", ObtainEmployeeByIdController)

routerEmployees.post("/create", HandleAutentification, validateFieldsInsertEmployee, CreateEmployeeController)
routerEmployees.delete("/delete/:employeeId", HandleAutentification, DeleteEmployeeController)
routerEmployees.put("/update/:employeeId", HandleAutentification, validateFieldsUpdateEmployee, UpdateEmployeeController)

export default routerEmployees