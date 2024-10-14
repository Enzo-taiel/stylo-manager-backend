import cors, { CorsOptions } from 'cors';
import { CORS_ORIGIN } from '../config/variables'

type IHandleOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void

const allowedOrigins = [CORS_ORIGIN, 'http://localhost:5173', 'http://localhost:3000']

const HandleOrigin: IHandleOrigin = (origin, cb) => {
  if (allowedOrigins.includes(origin || '')) {
    cb(null, true);
  } else {
    cb(new Error('Acceso no autorizado'), false);
  }
}

const cors_options: CorsOptions = {
  methods: ["HEAD", "GET", "POST", "PUT", "REMOVE"],
  origin: '*',
  optionsSuccessStatus: 204,
  maxAge: 3600
}

const corsConfig = cors(cors_options)

export default corsConfig