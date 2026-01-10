import { Request, Response, NextFunction } from "express";
import { AppointmentCase } from "@/modules/owner/application/appointment.case";

export const obtainAppointmentsController = async (req: Request, res: Response, next: NextFunction) => {
  const businessId = req.businessId
  try {
    const appointments = await AppointmentCase.findAppointmentsByBusinessId(businessId!)
    return res.status(200).json({
      message: "Appointment obtain successfully",
      error: false,
      success: true,
      appointments
    })
  } catch (error) {
    return next(error)
  }
}

export const obtainAppointmentController = async (req: Request, res: Response, next: NextFunction) => {
  const businessId = req.businessId
  try {
    const appointments = await AppointmentCase.findAppointmnetById(businessId!)
    return res.status(200).json({
      message: "Appointment obtain successfully",
      error: false,
      success: true,
      appointments
    })
  } catch (error) {
    return next(error)
  }
}