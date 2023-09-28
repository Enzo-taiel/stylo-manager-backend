import cors, { CorsOptions,  } from 'cors';
import { CORS_ORIGIN } from '../config/variables'

type IHandleOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void ) => void

const allowedOrigins = [CORS_ORIGIN]

const HandleOrigin: IHandleOrigin = (origin, cb) => {
  if (allowedOrigins.includes(origin || '')) {
    cb(null, true);
  } else {
    cb(new Error('Acceso no autorizado'), false);
  }
}

const cors_options: CorsOptions = {
  methods: ["GET", "POST", "HEAD"],
  origin: HandleOrigin,
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  exposedHeaders: 'Authorization',
  maxAge: 3600
}

const corsConfig = cors(cors_options)

export default corsConfig