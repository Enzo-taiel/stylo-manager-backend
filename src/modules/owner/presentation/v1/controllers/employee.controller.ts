import { NextFunction, Request, Response } from "express"
import { BusinessRepository } from "@/core/business/infrastructure/business.repository"
import { EmployeeCase } from "@/modules/owner/application/emloyee.case"

export const obtainEmployeesController = (req: Request, res: Response, next: NextFunction) => {
  const businessId = req.businessId

  try {
    const employees = EmployeeCase.obtainEmployeesByBusiness(businessId!)
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

export const obtainEmployeeByIdController = async (req: Request, res: Response, next: NextFunction) => {
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

export const createEmployeeController = async (req: Request, res: Response, next: NextFunction) => {

  const businessId = req.businessId

  const parseData = {
    ...req.body,
    business: businessId
  }

  try {
    const employee = await EmployeeCase.createEmployee(parseData)
    return res.status(201).json({
      message: "Employee created successfully.",
      error: false,
      succes: true,
      employee
    })
  } catch (error) {
    return next(error)
  }
}

export const deleteEmployeeController = async (req: Request, res: Response, next: NextFunction) => {

  const { employeeId } = req.params

  try {
    const employeeDeleted = await EmployeeCase.deleteEmployee(employeeId)
    // eliminar los appointments relacionados con el empleado eliminado
    return res.status(201).json({
      message: "employee deleted successfully.",
      error: false,
      succes: true
    })
  } catch (error) {
    return next(error)
  }
}

export const updateEmployeeController = async (req: Request, res: Response, next: NextFunction) => {

  const { employeeId } = req.params
  const employeeData = req.body

  try {
    const employee = await EmployeeCase.updateEmployee(employeeId, employeeData)
    return res.status(200).json({
      message: "Employee update successfully.",
      error: false,
      success: true,
      employee
    })
  } catch (error) {
    return next(error)
  }
}

export const updateAvatarEmployeeController = async (req: Request, res: Response, next: NextFunction) => {

  //@ts-ignore
  const file = req.file?.avatar as Express.Multer.File
  const businessId = req.businessId!
  const userId = req.userId!
  const { employeeId } = req.params

  try {

    const business = await BusinessRepository.findById(businessId)
    if (!business) return next({ status: 404, message: "Business not found." })

    const employee = await EmployeeCase.updateAvatar(
      business.category,
      file,
      businessId,
      userId,
      employeeId
    )

    return res.status(201).json({
      message: "Avatar uploaded successfully.",
      succcess: true,
      error: false,
      employee
    })

  } catch (error) {
    return next(error)
  }
}

export const updateJobsEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore 
  const files = req.files?.jobs as Express.Multer.File[]
  const businessId = req.businessId!
  const userId = req.userId!
  const { employeeId } = req.params

  try {
    const business = await BusinessRepository.findById(businessId)
    if (!business) return next({ status: 404, message: "Business not found." })

    const employee = await EmployeeCase.updateJobs(
      business.category,
      files,
      businessId,
      userId,
      employeeId
    )

    return res.status(200).json({
      message: "Employee jobs update successfully.",
      error: false,
      success: true,
      employee
    })

  } catch (error) {
    return next(error)
  }

}
