import { Router } from 'express'
import { DeleteEmployeeController } from '../controllers/employees/delete.controller'
import EmployeesValidateFieldsMiddleware from '../middleware/employees/createEmployeeMiddleware'
import { ObtainAllEmployeesController, CreateEmployeeController, ObtainEmployeeByIdController } from '../controllers/employees'

const routerEmployees = Router()
// VALIDAR QUE EL CLIENTE QUE ESTA PIDIENDO LOS EMPLOYEES 
// ESTE AUTHORIZADO O SEA DE UNA FUENTE CONFIABLE
routerEmployees.get("/obtain/all", ObtainAllEmployeesController)
routerEmployees.get("/obtain/:employeeId", ObtainEmployeeByIdController)

routerEmployees.post("/create", EmployeesValidateFieldsMiddleware, CreateEmployeeController)
routerEmployees.delete("/delete/:employeeId", DeleteEmployeeController)

export default routerEmployees