import Helmet from 'helmet';
import Cors from './middleware/cors';
import compression from 'compression';
import cookieParser from "cookie-parser";
import Morgan from './middleware/morgan';
import { PORT } from './config/variables';
import { connectDB } from './database/connect';
import routerClients from './routes/clients.routes';
import Express, { Application, json, urlencoded } from 'express';
import { sessionMiddleware } from './middleware/session';
import { createServer, Server as HttpServer } from "http";
import initializeSocket from './database/sockets/connect';
import { routerAuth, routerEmployees, routerServices, routerContacts, routerAppointments, routerSales, routerExpoWebHooks, routerNotifications, routerBussines } from './routes';

export class Server {
  private PORT: number;
  private APP: Application;
  private httpServer: HttpServer;

  constructor() {
    this.PORT = PORT;
    this.APP = Express();
    this.httpServer = createServer(this.APP);
  }

  private middleware() {
    this.APP.use(Cors);
    this.APP.use(Morgan);
    this.APP.use(json());
    this.APP.use(urlencoded({ extended: true }))
    this.APP.use(Helmet());
    this.APP.use(compression());
    this.APP.use(cookieParser())
    this.APP.use(sessionMiddleware);
  }

  private routes() {
    this.APP.use("/api/v1/auth", routerAuth);
    this.APP.use("/api/v1/sale", routerSales);
    this.APP.use("/api/v1/client", routerClients);
    this.APP.use("/api/v1/contact", routerContacts);
    this.APP.use("/api/v1/service", routerServices);
    this.APP.use("/api/v1/business", routerBussines);
    this.APP.use("/api/v1/employee", routerEmployees);
    this.APP.use("/api/v1/webhook", routerExpoWebHooks);
    this.APP.use("/api/v1/appointment", routerAppointments);
    this.APP.use("/api/v1/notification", routerNotifications);
  }

  public async startServer() {
    await connectDB();
    this.middleware();
    this.routes();

    initializeSocket(this.httpServer);
    this.httpServer.listen(this.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${this.PORT}.`)
      console.log(`El servidor se encuentra en: ${process.env.NODE_ENV!}.`);
    });
  }
}
