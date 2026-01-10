import { EmployeeModel } from "./employee.model";
import { IEmployee } from "../domain/employee.types";
import { EmployeeEntity } from "../domain/employee.entity";
import { ServiceModel } from "@/core/service/infrastructure/service.model";

export class EmployeeRepository {

  static async findByBusiness(business: string, session: any) {
    const employees = await EmployeeModel.find({ business }).session(session)
    if (!employees.length) return null
    return employees.map(e => new EmployeeEntity({
      name: e.name,
      jobs: e.jobs,
      info: e.info,
      avatar: e.avatar,
      skills: e.skills,
      createdAt: e.createdAt,
      updateAt: e.updatedAt,
      business: e.business.toString(),
      days_unavailable: e.days_unavailable,
      hours_unavailable: e.hours_unavailable,
      appointments: e.appointments.map(a => a.toString())
    }))
  }

  static async findById(employeeId: string, session?: any) {
    const employee = await EmployeeModel.findById(employeeId).session(session ?? null)
    if (!employee) return null
    return new EmployeeEntity({
      name: employee.name,
      jobs: employee.jobs,
      info: employee.info,
      avatar: employee.avatar,
      skills: employee.skills,
      createdAt: employee.createdAt,
      updateAt: employee.updatedAt,
      business: employee.business.toString(),
      days_unavailable: employee.days_unavailable,
      hours_unavailable: employee.hours_unavailable,
      appointments: employee.appointments.map(a => a.toString())
    })
  }

  static async findByServiceId(serviceId: string) {
    const service = await ServiceModel.findById(serviceId)
    if (!service) return null
    const employeesId = service.employees_available
    const employees = await EmployeeModel.find({ $in: { _id: employeesId } })
    if (!employees.length) return []

    return employees.map(e => new EmployeeEntity({
      name: e.name,
      jobs: e.jobs,
      info: e.info,
      avatar: e.avatar,
      skills: e.skills,
      createdAt: e.createdAt,
      updateAt: e.updatedAt,
      business: e.business.toString(),
      days_unavailable: e.days_unavailable,
      hours_unavailable: e.hours_unavailable,
      appointments: e.appointments.map(a => a.toString())
    }))
  }

  static async create(entity: EmployeeEntity, session: any) {
    const primitives = entity.toPrimitives()
    const [employee] = await EmployeeModel.create([primitives], { session })
    return new EmployeeEntity({
      name: employee.name,
      jobs: employee.jobs,
      info: employee.info,
      avatar: employee.avatar,
      skills: employee.skills,
      createdAt: employee.createdAt,
      updateAt: employee.updatedAt,
      business: employee.business.toString(),
      days_unavailable: employee.days_unavailable,
      hours_unavailable: employee.hours_unavailable,
      appointments: employee.appointments.map(a => a.toString())
    })
  }

  static async deleteEmployee(employeeId: string, session: any) {
    const employee = await EmployeeModel.findByIdAndDelete(employeeId).session(session)
    if (!employee) return null
    return new EmployeeEntity({
      name: employee.name,
      jobs: employee.jobs,
      info: employee.info,
      avatar: employee.avatar,
      skills: employee.skills,
      createdAt: employee.createdAt,
      updateAt: employee.updatedAt,
      business: employee.business.toString(),
      days_unavailable: employee.days_unavailable,
      hours_unavailable: employee.hours_unavailable,
      appointments: employee.appointments.map(a => a.toString())
    })
  }

  static async updateEmployee(employeeId: string, employeeData: Partial<IEmployee>, session: any) {
    const employee = await EmployeeModel.findOneAndUpdate({ _id: employeeId }, employeeData).session(session)
    if (!employee) return null
    return new EmployeeEntity({
      name: employee.name,
      jobs: employee.jobs,
      info: employee.info,
      avatar: employee.avatar,
      skills: employee.skills,
      createdAt: employee.createdAt,
      updateAt: employee.updatedAt,
      business: employee.business.toString(),
      days_unavailable: employee.days_unavailable,
      hours_unavailable: employee.hours_unavailable,
      appointments: employee.appointments.map(a => a.toString())
    })
  }

  static async asignAppointment(employeeId: string, appointmentId: string, session: any) {
    const employee = await EmployeeModel.findByIdAndUpdate(employeeId,
      { $push: { appointments: appointmentId } },
      { session }
    );

    if (!employee) return null
    return new EmployeeEntity({
      name: employee.name,
      jobs: employee.jobs,
      info: employee.info,
      avatar: employee.avatar,
      skills: employee.skills,
      createdAt: employee.createdAt,
      updateAt: employee.updatedAt,
      business: employee.business.toString(),
      days_unavailable: employee.days_unavailable,
      hours_unavailable: employee.hours_unavailable,
      appointments: employee.appointments.map(a => a.toString())
    })
  }

  static async removeAppointment(employeeId: string, appointmentId: string, session: any) {
    const employee = await EmployeeModel.findByIdAndUpdate(employeeId,
      { $pull: { appointments: appointmentId } },
      { session });

    if (!employee) return null
    return new EmployeeEntity({
      name: employee.name,
      jobs: employee.jobs,
      info: employee.info,
      avatar: employee.avatar,
      skills: employee.skills,
      createdAt: employee.createdAt,
      updateAt: employee.updatedAt,
      business: employee.business.toString(),
      days_unavailable: employee.days_unavailable,
      hours_unavailable: employee.hours_unavailable,
      appointments: employee.appointments.map(a => a.toString())
    })
  }

  // static async deleteAppointmentsForEmployeeDeleted(employeeId) {
  //   await AppointmentsModel.deleteMany({ employee: employeeId }).session(session);
  // }

}