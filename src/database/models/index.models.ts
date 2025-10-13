import mongoose from "mongoose";
import { Sales_Schema } from "./sales.model";
import { Users_Schema } from "./users.models";
import { Clients_Schema } from "./clients.model";
import { Contact_Schema } from "./contact.models";
import { Services_Schema } from "./services.models";
import { Employees_Schema } from "./employees.model";
import { Appointments_Schema } from "./appointments.models";
import { TempAppointments_Schema } from "./temp.appointment.model";

export const UsersModel = mongoose.model("users", Users_Schema)
export const SalesModel = mongoose.model("sales", Sales_Schema)
export const ClientsModel = mongoose.model("clients", Clients_Schema)
export const ContactModel = mongoose.model("contacts", Contact_Schema)
export const ServicesModel = mongoose.model("services", Services_Schema)
export const EmployeesModel = mongoose.model("employees", Employees_Schema)
export const AppointmentsModel = mongoose.model("appointments", Appointments_Schema)
export const TempAppointmentsModel = mongoose.model("tempAppointments", TempAppointments_Schema)