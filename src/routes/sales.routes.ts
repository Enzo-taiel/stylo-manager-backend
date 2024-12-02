import { Router } from 'express'
// CONTROLLERS
import { CreateSalesController, ObtainSalesAllController, DeleteSalesController } from '../controllers/sales'

const routerSales = Router()

routerSales.get("/all", ObtainSalesAllController)
// routerSales.get("/:employeeId", CreatePaymentController)
routerSales.post("/create", CreateSalesController)
routerSales.delete("/delete/:saleId", DeleteSalesController)

export default routerSales