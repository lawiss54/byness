import { Redis } from "@upstash/redis";

function getEnvOrThrow() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "❌ Missing Upstash Redis credentials. Please provide UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment variables."
    );
  }

  return { url, token };
}

export const redis = new Redis(getEnvOrThrow());