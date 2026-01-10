import { Schema, Types } from "mongoose";
import { IEmployeeDocument, IEmployeeModel } from "../domain/employee.types";

export const EmployeeSchema = new Schema<IEmployeeDocument, IEmployeeModel>({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      require: true
    }
  ],
  business: [
    {
      type: Types.ObjectId,
      ref: "business",
      required: true
    }
  ],
  appointments: [
    {
      type: Types.ObjectId,
      ref: "appointments",
    }
  ],
  days_unavailable: [
    {
      type: String,
      require: true
    }
  ],
  hours_unavailable: [
    {
      type: String,
      require: true
    }
  ],
  info: {
    city: {
      type: String,
      required: false
    },
    instagramUsername: {
      type: String,
      required: false
    },
    days_available: {
      type: String,
      required: true
    },
    hours_available: {
      type: String,
      required: true
    }
  },
  jobs: [
    {
      type: String,
      required: false
    }
  ]
})

EmployeeSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  // Asegurarte de borrar SOLO lo del business correcto (multi-tenant)
  // await Reservation.deleteMany({
  //   employee: doc._id,
  //   business: doc.business
  // });
});