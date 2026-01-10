import mongoose from "mongoose";
import { IEmployeeDocument, IEmployeeModel } from "../domain/employee.types";
import { EmployeeSchema } from "./employee.schema";

export const EmployeeModel = mongoose.model<IEmployeeDocument, IEmployeeModel>("employee", EmployeeSchema);