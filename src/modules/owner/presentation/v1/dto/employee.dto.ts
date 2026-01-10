import { IInfoEmployee } from "@/core/employee/domain/employee.types";

export interface CreateEmployeeDTO {
  name: string;
  avatar: string
  skills: Array<string>;
  daysUnavailable: Array<string>;
  hoursUnavailable: Array<string>;
  updateAt: Date
  createdAt: Date
  business: string
  info: IInfoEmployee
  jobs: Array<string>
  appointments?: Array<string>
  days_unavailable: Array<string>
  hours_unavailable: Array<string>

}


export interface UpdateEmployeeDTO {
  name?: string;
  skills?: string[];
  daysUnavailable?: string[];
  hoursUnavailable?: string[];
  info?: {
    city?: string;
    instagramUsername?: string;
    daysAvailable?: string;
    hoursAvailable?: string;
  }
}
