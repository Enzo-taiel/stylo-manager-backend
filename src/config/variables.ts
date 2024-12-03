const isDevelopment = process.env.NODE_ENV === "development"

export const CORS_ORIGIN = process.env.CORS_ORIGINS?.split(',') || ["http://localhost:8081", "http://192.168.1.46:8081", "exp://192.168.1.46:8081"]
export const PORT = Number(process.env.PORT) || 8080
export const SECRET_KEY_JWT = isDevelopment ? process.env.SECRET_KEY_JWT_DEVELOPMENT! : process.env.SECRET_KEY_JWT_PRODUCTION!

export const WHATSAPP_ENV = {
  WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || "EAAHiUe1nZB1QBOxxINzciiIKUuRj0ZBNUfwJhvmIG1ZCPuJ4VRFU5ptmlUHsxsgZCclBrhloFoC4GCGoDROxi8MkFA7LI48M1eZCt6dwpgkS0TylUu3b5Hu8JIivXtRU3fHviywZClqPduqZCegt5ne54XV5zMHbvMk1bUv2eXO5jPrh8IepOssNovOfSaTawcWtEGzX5VZCeYb2MIkObCr6rIuuIgcZD",
  PHONE_IDENTIFIER_WHATSAPP: process.env.PHONE_IDENTIFIER_WHATSAPP || "444236608776819",
}

export const DATABASE_NSQL = {
  DATABASE_NSQL_URI: isDevelopment ? "mongodb+srv://enzonavarro28:42092289@cluster0.gnc2omx.mongodb.net/" : process.env.MONDOGB_URI!,
  DATABASE_NSQL_DB: isDevelopment ? "test" : process.env.DATABASE_DB!
}

export const WEB_PUSH = {
  VAPID_EMAIL: process.env.VAPID_EMAIL! || "contacto@stylo.com.ar",
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY || "BAuDc4bN2CRxSkUzGukQfFDs-SdqilT1nAc1XnVdzn4IrI1DJcZ10IfCQN8Ydb7BGCvYSRfKZS48fHSgchPL0aI",
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY || "VhC1-HwDsy2JD4XxQht9iTMkCiO5P3HFUkwbALcP704"
}