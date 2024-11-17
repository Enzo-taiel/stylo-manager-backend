import { Router } from 'express'
// CONTROLLERS
import { CreateSalesController, ObtainSalesAllController } from '../controllers/sales'

const routerSales = Router()

routerSales.get("/all", ObtainSalesAllController)
// routerSales.get("/:employeeId", CreatePaymentController)
routerSales.post("/create", CreateSalesController)

export default routerSales