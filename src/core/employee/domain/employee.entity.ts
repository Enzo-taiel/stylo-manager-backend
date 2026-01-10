import { IInfoEmployee } from "./employee.types";
import { BusinessRepository } from "@/core/business/infrastructure/business.repository";
import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository";

export interface IEmployeeEntity {
  id?: string
  name: string
  avatar: string
  updateAt: Date
  createdAt: Date
  business: string
  info: IInfoEmployee
  jobs: Array<string>
  skills: Array<string>
  appointments?: Array<string>
  days_unavailable: Array<string>
  hours_unavailable: Array<string>
}

export class EmployeeEntity {

  constructor(private props: IEmployeeEntity) { }

  get id() { return this.props.id }

  async getAppointemnts() {
    const appointments = await AppointmentRepository.findByEmployee(this.props.id!)
    return appointments
  }

  async getBusiness() {
    const business = await BusinessRepository.findById(this.props.business)
    return business
  }

  toPrimitives() {
    return { ...this.props }
  }

}