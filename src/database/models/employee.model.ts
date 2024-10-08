import { Schema } from 'mongoose';
// SCHEMAS
import { EmployeeSchema } from '../schemas'

const Employee_Schema = new Schema(EmployeeSchema, { timestamps: true });

export { Employee_Schema }