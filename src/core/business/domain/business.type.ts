import { IUser } from "@/core/user/domain/user.type";
import mongoose, { Document, Model, Types } from "mongoose"

export interface IBusinessBase {
  name: string;
  description: string;
  address: string;
  phone: string;
  favicon: string;
  email: string;
  domain: string;
  schedule: string;
  openDays: string[];
  subdomain: string
  category: string;
  openTime: string;
  closeTime: string;
  owner: Types.ObjectId;
}

export interface IBusiness extends IBusinessBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBusinessCreate {
  name: string
  description: string
  address: string
  phone: string
  favicon: string
  email?: string
  domain: string
  schedule: string
  openDays: string[]
  category: string
  openTime: string
  closeTime: string
  owner: string
}


/**
 * Methods (this)
 */
export interface BusinessMethods {
  updateStatus(status: string, session: mongoose.mongo.ClientSession): Promise<boolean>;
}

/**
 * Statics (AppointmentModel.someStatic)
 */
export interface BusinessStatics {
  findFullById(id: string): Promise<IBusinessDocument | null>;
}

/**
 * Query helpers
 */
export interface BusinessQueryHelpers {
  byBusiness(businessId: string): this;
}

/**
 * Documento final con métodos
 */
export type IBusinessDocument = Document &
  IBusiness &
  BusinessMethods;

/**
 * Modelo final con estáticos y query helpers
 */
export type IBusinessModel = Model<IBusinessDocument, BusinessQueryHelpers> &
  BusinessStatics;
