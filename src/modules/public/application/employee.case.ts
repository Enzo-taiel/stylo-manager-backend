import { withTransaction } from "@/shared/database/withTransaction";
import { EmployeeEntity } from "@/core/employee/domain/employee.entity";
import { EmployeeRepository } from "@/core/employee/infrastructure/employee.repository";

export const EmployeeCase = {
  async obtainEmployeesByBusinessId(businessId: string) {
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
  }
}