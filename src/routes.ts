import { Application } from "express";
import { OwnerAuthModule } from "./core/auth";
import { OwnerUserModule } from "./core/user";
import { PublicSessionModule } from "./core/session";
import { PublicContactModule } from "./core/contact";
import { OwnerServiceModule, PublicServiceModule } from "./core/service";
import { PublicBusinessModule, OwnerBusinessModule } from "./core/business";
import { OwnerEmployeeModule, PublicEmployeeModule } from "./core/employee";
import { OwnerAppointmentModule, PublicAppointmentModule } from "./core/appointment";

export function registerRoutes(app: Application) {

  // Rutas públicas (clientes)
  app.use("/api/v1/public/service", PublicServiceModule.v1);
  app.use("/api/v1/public/session", PublicSessionModule.v1);
  app.use("/api/v1/public/contact", PublicContactModule.v1);
  app.use("/api/v1/public/business", PublicBusinessModule.v1);
  app.use("/api/v1/public/employee", PublicEmployeeModule.v1);
  app.use("/api/v1/public/appointment", PublicAppointmentModule.v1);

  // Rutas del owner
  app.use("/api/v1/owner/auth", OwnerAuthModule.v1);
  app.use("/api/v1/owner/user", OwnerUserModule.v1);
  app.use("/api/v1/owner/service", OwnerServiceModule.v1);
  app.use("/api/v1/owner/employee", OwnerEmployeeModule.v1);
  app.use("/api/v1/owner/business", OwnerBusinessModule.v1);
  app.use("/api/v1/owner/appointment", OwnerAppointmentModule.v1);
}
