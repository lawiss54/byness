import requestIp from "request-ip";

/**
 * توليد بصمة فريدة للمستخدم اعتمادًا على IP و User-Agent
 * @param req - Next.js API Request
 * @returns fingerprint string
 */
export function getFingerprint(req: Request): string {
  try {
    // جلب IP من رأس الطلب
    const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const cfConnectingIp = req.headers.get("cf-connecting-ip");
    const xRealIp = req.headers.get("x-real-ip");

    // fallback إلى مكتبة request-ip
    const clientIp =
      forwardedFor ||
      cfConnectingIp ||
      xRealIp ||
      requestIp.getClientIp(req as any) ||
      "inconnue";

    // جلب User Agent
    const userAgent = req.headers.get("user-agent") || "unknown";

    // توليد بصمة
    return `${clientIp}_${userAgent}`;
  } catch (error) {
    // في حال فشل أي شيء، نولد بصمة عشوائية
    return `anonymous_${crypto.randomUUID()}`;
  }
}
