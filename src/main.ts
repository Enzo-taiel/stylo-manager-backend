import Express, { Application, json } from 'express';
import Helmet from 'helmet'
import compression from 'compression'
// CONFIGS
import { PORT } from './config/variables'
// MIDDLEWARE
import Cors from './middleware/cors';
import Morgan from './middleware/morgan';
import SelectDB from './middleware/connectDB';
import BusinessHandle from './middleware/business';
import HandleAuthorizationDashboard from './middleware/token';
// ROUTER
import { routerAuth, routerClothes } from './routes'

export class Server {

  private APP: Application
  private PORT: number

  constructor() {
    this.APP = Express()
    this.PORT = PORT
  }

  private middleware() {
    this.APP.use(Cors)
    this.APP.use(Helmet())
    this.APP.use(compression())
    this.APP.use(json())
    this.APP.use(Morgan)
  }

  private routes() {
    this.APP.use("/api/v1/auth", routerAuth)
    this.APP.use("/api/v1/clothes", BusinessHandle, SelectDB, routerClothes)
    this.APP.use("/api/v1/admin", BusinessHandle, SelectDB, HandleAuthorizationDashboard, routerAuth)
  }

  public start_server() {
    this.middleware()
    this.routes()
    this.APP.listen(this.PORT, () => {
      console.log(`Listen server on port ${this.PORT}.`)

    })

  }

}