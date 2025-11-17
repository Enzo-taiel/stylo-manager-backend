import { NextFunction, Request, Response } from "express";
import { AppointmentsModel, EmployeesModel, ServicesModel } from "../../database/models/index.model";
import mongoose from "mongoose";

export const DeleteEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
  const employeeId = req.params.employeeId;
  const session = await mongoose.startSession();

  try {

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return next({
        message: "Invalid employee ID.",
        httpStatus: 400,
        inputError: null
      });
    }

    session.startTransaction();

    const employee = await EmployeesModel.findById(employeeId).session(session);
    if (!employee) {
      await session.abortTransaction();
      return next({
        message: "Employee not found.",
        httpStatus: 404,
        inputError: null
      });
    }

    await EmployeesModel.deleteOne({ _id: employeeId }).session(session);

    await AppointmentsModel.deleteMany({ employee: employeeId }).session(session);

    await ServicesModel.updateMany(
      { availableEmployees: employeeId },
      { $pull: { availableEmployees: employeeId } }
    ).session(session);

    await session.commitTransaction();

    return res.status(200).json({
      message: "Employee deleted successfully (cascade applied).",
      success: true,
      error: false
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("DeleteEmployee error:", error);

    return next({
      message: "Internal server error deleting employee.",
      httpStatus: 500,
      inputError: null
    });
  } finally {
    session.endSession();
  }
};
