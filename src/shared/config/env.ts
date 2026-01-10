import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}


export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  // Server
  PORT: Number(process.env.PORT ?? 8080),

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : [
      "http://localhost:8081",
      "http://192.168.1.46:8081",
      "exp://192.168.1.46:8081",
    ],

  // JWT
  SECRET_KEY_JWT: requireEnv("SECRET_KEY_JWT"),

  // WhatsApp
  WHATSAPP: {
    ACCESS_TOKEN: requireEnv("WHATSAPP_ACCESS_TOKEN"),
    PHONE_IDENTIFIER: requireEnv("PHONE_IDENTIFIER_WHATSAPP"),
  },

  // MongoDB
  DATABASE: {
    URI: requireEnv("MONGODB_URI"),
    NAME: requireEnv("MONGODB_DB"),
  },

  // Web Push (VAPID)
  WEB_PUSH: {
    EMAIL: requireEnv("VAPID_EMAIL"),
    PUBLIC_KEY: requireEnv("VAPID_PUBLIC_KEY"),
    PRIVATE_KEY: requireEnv("VAPID_PRIVATE_KEY"),
  },

  // Supabase
  SUPABASE: {
    URL: requireEnv("SUPABASE_URL"),
    SERVICE_ROLE_KEY: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  },
};
