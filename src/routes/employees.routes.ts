import { Router } from 'express'
// CONTROLLERS
import { ObtainAllEmployeesController, CreateEmployeeController, ObtainEmployeeByIdController } from '../controllers/employees'
// MIDDLEWARE
import EmployeesValidateFieldsMiddleware from '../middleware/employees/createEmployeeMiddleware'

const routerEmployees = Router()
// VALIDAR QUE EL CLIENTE QUE ESTA PIDIENDO LOS EMPLOYEES 
// ESTE AUTHORIZADO O SEA DE UNA FUENTE CONFIABLE
routerEmployees.get("/all", ObtainAllEmployeesController)
routerEmployees.get("/:employeeId", ObtainEmployeeByIdController)
routerEmployees.post("/create", EmployeesValidateFieldsMiddleware, CreateEmployeeController)


export default routerEmployees