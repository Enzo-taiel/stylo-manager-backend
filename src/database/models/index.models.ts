import mongoose from "mongoose";
import { Users_Schema } from "./users.model";
import { Employees_Schema } from "./employees.model";
import { Services_Schema } from "./services.model";
import { Clients_Schema } from "./clients.model";
import { Appointments_Schema } from "./appointments.model";

export const UsersModel = mongoose.model("users", Users_Schema)
export const EmployeesModel = mongoose.model("employees", Employees_Schema)
export const ServicesModel = mongoose.model("services", Services_Schema)
export const ClientsModel = mongoose.model("clients", Clients_Schema)
export const AppointmentsModel = mongoose.model("appointments", Appointments_Schema)