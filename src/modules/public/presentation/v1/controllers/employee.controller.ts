import { NextFunction, Request, Response } from "express";
import { EmployeeCase } from "@/modules/public/application/employee.case";

export const obtainEmployeesController = (req: Request, res: Response, next: NextFunction) => {
  const businessId = req.businessId
  try {
    const employees = EmployeeCase.obtainEmployeesByBusinessId(businessId!)
    return res.status(200).json({
      message: "Employees obtain successfully.",
      error: false,
      success: true,
      employees
    })
  } catch (error) {
    return next(error)
  }
}

export const obtainEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
  const { employeeId } = req.params
  try {
    const employee = await EmployeeCase.obtainEmployeeById(employeeId)
    return res.status(200).json({
      message: "Employee obtain successfully.",
      error: false,
      success: true,
      employee
    })
  } catch (error) {
    return next(error)
  }
}
