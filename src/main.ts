import Helmet from 'helmet';
import compression from 'compression';
import cookieParser from "cookie-parser";
import { createServer, Server as HttpServer } from "http";
import Express, { Application, json, urlencoded } from 'express';


import { ENV } from './shared/config/env';
import { connectDB } from './shared/database/mongoose';
import initializeSocket from './shared/database/socket';

import { registerRoutes } from './routes';
import corsConfig from './shared/middleware/cors';
import morganConfig from './shared/middleware/morgan';
import { errorMiddleware } from './shared/middleware/errors';
import { sessionMiddleware } from './shared/middleware/session';

export class Server {
  private PORT: number;
  private APP: Application;
  private httpServer: HttpServer;

  constructor() {
    this.PORT = ENV.PORT;
    this.APP = Express();
    this.httpServer = createServer(this.APP);
  }

  private middleware() {
    this.APP.use(corsConfig);
    this.APP.use(morganConfig);
    this.APP.use(json());
    this.APP.use(urlencoded({ extended: true }));
    this.APP.use(Helmet());
    this.APP.use(compression());
    this.APP.use(cookieParser());
  }

  private routes() {
    registerRoutes(this.APP)
    // this.APP.use("/api/v1/client", routerClients);
    // this.APP.use("/api/v1/contact", routerContacts);
    // this.APP.use("/api/v1/webhook", routerExpoWebHooks);
    // this.APP.use("/api/v1/appointment", routerAppointments);
    // this.APP.use("/api/v1/notification", routerNotifications);
    this.APP.use(errorMiddleware)
  }

  public async startServer() {
    await connectDB();
    this.middleware();
    this.routes();

    initializeSocket(this.httpServer);
    this.httpServer.listen(this.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${this.PORT}.`);
      console.log(`El servidor se encuentra en: ${process.env.NODE_ENV!}.`);
    });
  }
}
