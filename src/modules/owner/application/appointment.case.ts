import { AppointmentRepository } from "@/core/appointment/infrastructure/appointment.repository";

export const AppointmentCase = {
  async findAppointmnetById(appointmentId: string) {
    const appointment = await AppointmentRepository.findById(appointmentId)
    return appointment ?? null
  },

  async findAppointmentsByBusinessId(businessId: string) {
    const appointments = await AppointmentRepository.findByBusinessId(businessId)
    return appointments ?? null
  }
}