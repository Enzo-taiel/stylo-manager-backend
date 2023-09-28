import Express, { Application } from 'express';

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

  middleware() {
    this.APP.use(Morgan)
    this.APP.use(Cors)
  }

  routes() {
    this.APP.use("/api/auth", routerAuth)
  }

  start_server() {
    this.APP.listen(this.PORT, ()=> {
      console.log(`Listen server on port ${this.PORT}`)
    })
  }

}