// Listen Server
import { Server } from './main';

require('dotenv').config();

const srv = new Server()

srv.middleware()
srv.startServer()