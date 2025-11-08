import { Request, Response } from 'express'
import mongoose from 'mongoose'

// INTERFACE DATABASE
import { IServices } from '../../database/interface'
// DATABASE
import { SalesModel, ServicesModel } from '../../database/models/index.model'

export const ObtainAllServicesController = async (req: Request, res: Response) => {
  const business = req.businessId
  try {
    const services: IServices[] = await ServicesModel.find({ business }).populate("employees_available")
    return res.status(200).json({ message: "Services obtain successfully.", services })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }
}

export const ObtainServiceByIdController = async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId
  const business = req.businessId
  try {
    const service = await ServicesModel.find({ _id: serviceId, business }).populate("employees_available")
    if (!service) return res.status(404).json({ message: "El servicio no existe", error: true, success: false })
    return res.status(200).json({ message: "Servicios obtenidos satisfactoriamente.", service: service[0], error: false, success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server.", error: true, success: false })
  }
}


export const ObtanTopServicesByEmployee = async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;

  try {
    const rankingServices = await SalesModel.aggregate([
      {
        // Filtrar las ventas por el `employeeId` proporcionado
        $match: { employee: new mongoose.Types.ObjectId(employeeId) },
      },
      {
        // Unir la colección de servicios
        $lookup: {
          from: 'services',
          localField: 'service',
          foreignField: '_id',
          as: 'serviceDetails',
        },
      },
      {
        // Desnormalizar el array de servicios
        $unwind: '$serviceDetails',
      },
      {
        // Agrupar por servicio y contar el total de ventas
        $group: {
          _id: '$service',
          serviceName: { $first: '$serviceDetails.title' },
          totalSales: { $sum: 1 },
        },
      },
      {
        // Ordenar los servicios por el total de ventas en orden descendente
        $sort: { totalSales: -1 },
      },
    ]);

    return res.status(200).json({ message: "Services top obtain successfully.", rankingServices })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error internal Server." })
  }

}