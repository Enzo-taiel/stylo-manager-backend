import cors, { CorsOptions } from 'cors';
import { ENV } from '@/shared/config/env'

type IHandleOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void

const allowedOrigins = ENV.CORS_ORIGIN

const HandleOrigin: IHandleOrigin = (origin, cb) => {
  if (allowedOrigins.includes(origin || '')) {
    cb(null, true);
  } else {
    cb(new Error('Acceso no autorizado'), false);
  }
}

const cors_options: CorsOptions = {
  methods: ["HEAD", "GET", "POST", "PUT", "REMOVE"],
  origin: "*",
  optionsSuccessStatus: 204,
  maxAge: 3600,
  credentials: true
}

const corsConfig = cors(cors_options)

export default corsConfig