import Express, { Application, json } from 'express';
import Helmet from 'helmet'
// CONFIGS
import { PORT } from './config/variables'
// MIDDLEWARE
import Cors from './middleware/cors';
import Morgan from './middleware/morgan';
// ROUTER
import { routerAuth } from './routes/index.routes'

export class Server {

  private APP: Application
  private PORT: number

  constructor() {
    this.APP = Express()
    this.PORT = PORT
  }

  private middleware() {
    this.APP.use(Cors)
    this.APP.use(Morgan)
    this.APP.use(json())
    this.APP.use(Helmet())
  }

  private routes() {
    this.APP.use("/api/auth", routerAuth)
  }

  public start_server() {
    this.middleware()
    this.routes()
    this.APP.listen(this.PORT, () => {
      console.log(`Listen server on port ${this.PORT}.`)
    })

  }

}