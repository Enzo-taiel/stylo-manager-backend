import { BusinessRepository } from "@/core/business/infrastructure/business.repository"
import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository"
import { EmployeeRepository } from "@/core/employee/infrastructure/employee.repository"

export interface IServiceEntity {
  id?: string
  title: string
  price: string
  subtitle: string
  duration: string
  business: string
  price_kids?: string
  descriptions: string[]
  employees_available: string[]
}

export class ServiceEntity {

  constructor(private props: IServiceEntity) { }

  get id() { return this.props.id }

  async getEmployeeAvailable(){
    const employees = await EmployeeRepository.findByServiceId(this.props.id!)
    return employees
  }

  toPrimitives() {
    return { ...this.props }
  }

}