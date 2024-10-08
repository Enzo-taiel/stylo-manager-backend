import mongoose from "mongoose";
import { User_Schema } from "./users.model";
import { Employee_Schema } from "./employee.model";
import { Services_Schema } from "./services.model";

export const UsersModel = mongoose.model("users", User_Schema)
export const EmployeeModel = mongoose.model("employees", Employee_Schema)
export const ServicesModel = mongoose.model("services", Services_Schema)

