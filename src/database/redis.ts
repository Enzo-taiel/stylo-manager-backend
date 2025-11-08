import Redis from "ioredis";
 
export const redis = new Redis({
  host: "redis-15461.c10.us-east-1-4.ec2.redns.redis-cloud.com",
  port: 15461,
  password: "NfLsAWXfGnetskweuPGJpiIyff2IexxS",
  username: "default"
});

redis.on("connect", () => {
  console.log("[Redis] Conectado exitosamente ✅");
});

redis.on("error", (err) => {
  console.error("[Redis] Error de conexión ❌", err);
  process.exit(1);
});
