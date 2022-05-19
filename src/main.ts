import Express, { Application } from 'express';

// MIDDLEWARE
import Cors from './middleware/cors';
import Morgan from './middleware/morgan';

class Server {

  private app: Application
  private PORT: number

  constructor() {
    this.app = Express()
    this.PORT = Number(process.env.PORT)
  }

  middleware() {
    this.app.use(Morgan)
    this.app.use(Cors)
  }

  startServer() {
    this.app.listen(this.PORT, ()=> {
      console.log(`Listen server on port ${this.PORT}`)
    })
  }

}

export { Server }