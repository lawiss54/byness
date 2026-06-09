import { Redis } from "@upstash/redis";

function getEnvOrThrow() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "❌ Les informations d'identification Redis sont manquantes. Veuillez configurer les variables UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN."
    );
  }

  return { url, token };
}

export const redis = new Redis(getEnvOrThrow());
