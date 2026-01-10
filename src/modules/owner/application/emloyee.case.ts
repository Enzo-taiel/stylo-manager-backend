import { withTransaction } from "@/shared/database/withTransaction";
import { EmployeeStorage } from "@/core/employee/infrastructure/employee.storage";
import { IEmployee, IEmployeeDocument } from "@/core/employee/domain/employee.types";
import { EmployeeRepository } from "@/core/employee/infrastructure/employee.repository";
import { EmployeeEntity } from "@/core/employee/domain/employee.entity";
import { CreateEmployeeDTO } from "../presentation/v1/dto/employee.dto";

export const EmployeeCase = {
  async obtainEmployeesByBusiness(businessId: string) {
    return withTransaction<EmployeeEntity[] | null>(async (session) => {
      const employees = await EmployeeRepository.findByBusiness(businessId, session)
      return employees
    })
  },

  async obtainEmployeeById(employeeId: string) {
    return withTransaction<EmployeeEntity | null>(async (session) => {
      const employee = await EmployeeRepository.findById(employeeId, session)
      return employee
    })
  },

  async createEmployee(dto: CreateEmployeeDTO) {
   return withTransaction<EmployeeEntity>(async (session) => {
      // Convertimos DTO a entidad de dominio
      const employee = new EmployeeEntity(dto);

      // Persistimos
      const created = await EmployeeRepository.create(employee, session);

      // Retornamos la entidad
      return created;
    })
  },

  async deleteEmployee(employeeId: string) {
    return withTransaction<EmployeeEntity | null>(async (session) => {
      const employeeDeleted = await EmployeeRepository.deleteEmployee(employeeId, session)
      return employeeDeleted
    })
  },

  async updateEmployee(employeeId: string, employeeData: Partial<IEmployee>) {
    return withTransaction<EmployeeEntity | null>(async (session) => {
      const employee = await EmployeeRepository.updateEmployee(employeeId, employeeData, session)
      return employee
    })
  },

  async updateAvatar(category: string, file: Express.Multer.File, businessId: string, userId: string, employeeId: string): Promise<EmployeeEntity | null> {
    return withTransaction<EmployeeEntity | null>(async (session) => {
      const avatar = await EmployeeStorage.uploadAvatar(category, file, businessId, userId, employeeId)
      const employee = await EmployeeRepository.updateEmployee(employeeId, { avatar }, session)
      return employee
    })
  },

  async updateJobs(category: string, files: Express.Multer.File[], businessId: string, userId: string, employeeId: string) {
    return withTransaction(async (session) => {
      const jobs = await EmployeeStorage.uploadJobs(files, category, userId, businessId, employeeId)
      const employee = await EmployeeRepository.updateEmployee(employeeId, { jobs }, session)
    })
  }

}