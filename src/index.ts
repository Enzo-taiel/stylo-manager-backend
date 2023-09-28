// Server
import { Server } from './main';

// DATABASE CONNECTION
// import './database/NSQL/connectNSQL'
import './database/SQL/connectSQL'

require('dotenv').config();

const srv = new Server()

srv.start_server()
srv.middleware()
srv.routes()