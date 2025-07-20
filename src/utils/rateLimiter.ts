import { redis } from "@/lib/redis";

const WINDOW_IN_SECONDS = 60; // 1 minute
const MAX_REQUESTS = 3; // max requests per IP per minute
const KEY_PREFIX = "rate_limit:";

// Lua script to ensure atomic operations in Redis
const RATE_LIMIT_SCRIPT = `
local key = KEYS[1]
local window = tonumber(ARGV[1])

local current = redis.call('INCR', key)
if current == 1 then
  redis.call('EXPIRE', key, window)
end
local ttl = redis.call('TTL', key)
return { current, ttl }
`;

export const rateLimiter = {
  limit: async (identifier: string) => {
    const key = `${KEY_PREFIX}${identifier}`;

    try {
      const [currentRequests, ttl] = (await redis.eval(
        RATE_LIMIT_SCRIPT,
        [key],
        [WINDOW_IN_SECONDS.toString()]
      )) as [number, number];

      const remaining = Math.max(0, MAX_REQUESTS - currentRequests);

      const response = {
        success: true,
        allowed: currentRequests <= MAX_REQUESTS,
        limit: MAX_REQUESTS,
        remaining,
        reset: ttl,
        retryAfter: ttl,
        window: WINDOW_IN_SECONDS,
      };

      if (!response.allowed) {
        response.success = false;
        response.remaining = 0;
      }

      return response;
    } catch (error) {
      console.error("Rate limiter error:", error);
      return {
        success: true,
        allowed: true,
        limit: MAX_REQUESTS,
        remaining: MAX_REQUESTS,
        reset: WINDOW_IN_SECONDS,
        retryAfter: 0,
        window: WINDOW_IN_SECONDS,
      };
    }
  },
};