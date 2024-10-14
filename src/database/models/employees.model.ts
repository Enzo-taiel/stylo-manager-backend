import { Schema } from 'mongoose';
// SCHEMAS
import { EmployeesSchema } from '../schemas'

const Employees_Schema = new Schema(EmployeesSchema, { timestamps: true });

export { Employees_Schema }