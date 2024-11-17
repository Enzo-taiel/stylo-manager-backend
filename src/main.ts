import Express, { Application, json } from 'express';
import Helmet from 'helmet';
import compression from 'compression';
import { createServer, Server as HttpServer } from "http";
// CONFIGS
import { PORT } from './config/variables';
// MIDDLEWARE
import Cors from './middleware/cors';
import Morgan from './middleware/morgan';
// ROUTER
import { routerAuth, routerEmployees, routerServices, routerContacts, routerAppointments, routerSales, routerExpoWebHooks, routerNotifications } from './routes';
// SOCKET CONFIG
import initializeSocket from './database/sockets/connect';

export class Server {
  private APP: Application;
  private PORT: number;
  private httpServer: HttpServer;

  constructor() {
    this.APP = Express();
    this.PORT = PORT;
    this.httpServer = createServer(this.APP);
  }

  private middleware() {
    this.APP.use(Cors);
    this.APP.use(Helmet());
    this.APP.use(compression());
    this.APP.use(json());
    this.APP.use(Morgan);
  }

  private routes() {
    this.APP.use("/api/v1/auth", routerAuth);
    this.APP.use("/api/v1/employees", routerEmployees);
    this.APP.use("/api/v1/services", routerServices);
    this.APP.use("/api/v1/contact", routerContacts);
    this.APP.use("/api/v1/appointments", routerAppointments);
    this.APP.use("/api/v1/sales", routerSales);

    this.APP.use("/api/v1/notification", routerNotifications);

    this.APP.use("/api/v1/webhook", routerExpoWebHooks);

  }

  public startServer() {
    this.middleware();
    this.routes();

    // Inicializar Socket.IO pasando el servidor HTTP
    initializeSocket(this.httpServer);

    this.httpServer.listen(this.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${this.PORT}.`);
    });
  }
}
