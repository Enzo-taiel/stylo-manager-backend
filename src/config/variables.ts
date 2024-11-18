export const CORS_ORIGIN = process.env.CORS_ORIGINS?.split(',') || []
export const PORT = Number(process.env.PORT) || 8080
export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT || "SHHH"

export const WHATSAPP_ENV = {
  WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || "EAAHiUe1nZB1QBOxxINzciiIKUuRj0ZBNUfwJhvmIG1ZCPuJ4VRFU5ptmlUHsxsgZCclBrhloFoC4GCGoDROxi8MkFA7LI48M1eZCt6dwpgkS0TylUu3b5Hu8JIivXtRU3fHviywZClqPduqZCegt5ne54XV5zMHbvMk1bUv2eXO5jPrh8IepOssNovOfSaTawcWtEGzX5VZCeYb2MIkObCr6rIuuIgcZD",
  PHONE_IDENTIFIER_WHATSAPP: process.env.PHONE_IDENTIFIER_WHATSAPP || "444236608776819",
}

export const DATABSE_NSQL = {
  DATABASE_NSQL_URI: process.env.DATABASE_NSQL_URI || "mongodb+srv://enzotaiel118:42092289@cluster0.4agpn.mongodb.net/",
  DATABSE_NSQL_USER: process.env.DATABASE_NSQL_USER || "administrator",
  DATABASE_NSQL_PASS: process.env.DATABASE_NSQL_PASS || "administrator"
}

export const WEB_PUSH = {
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY || "BAuDc4bN2CRxSkUzGukQfFDs-SdqilT1nAc1XnVdzn4IrI1DJcZ10IfCQN8Ydb7BGCvYSRfKZS48fHSgchPL0aI",
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY || "VhC1-HwDsy2JD4XxQht9iTMkCiO5P3HFUkwbALcP704"
}