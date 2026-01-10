import { ServiceRepository } from "@/core/service/infrastructure/service.repository";
import { EmployeeRepository } from "@/core/employee/infrastructure/employee.repository";
import { BusinessRepository } from "@/core/business/infrastructure/business.repository";
import { TAppointmentMethodPayment, TAppointmentPaymentStatus, TAppointmentStatus } from "./appointment.type";

export interface IAppointmentEntity {
  id?: string
  service: string
  employee: string
  business: string
  payments: Array<string>
  date: string,
  hour: string,
  status: TAppointmentStatus
  methodPayment: TAppointmentMethodPayment
  paymentStatus: TAppointmentPaymentStatus
  session: string
  clientName: string
  clientPhone: string
}

export class AppointmentEntity {

  constructor(private props: IAppointmentEntity) { }

  get id() { return this.props.id }
  get serviceId() { return this.props.service }
  get employeeId() { return this.props.employee }
  get businessId() { return this.props.business }

  async getService() {
    const service = await ServiceRepository.findById(this.props.service)
    return service
  }

  async getEmployee() {
    const employee = await EmployeeRepository.findById(this.props.employee)
    return employee
  }

  async getBusiness() {
    const business = await BusinessRepository.findById(this.props.business)
    return business
  }

  toPrimitives() {
    return { ...this.props }
  }

}