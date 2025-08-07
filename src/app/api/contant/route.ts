import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCache, setCache, delCache } from "@/lib/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// دالة مساعدة للتحقق من صحة البيانات
const validateApiResponse = (data: any) => {
  if (!data) {
    return { isValid: false, error: "Aucune donnée reçue du serveur" };
  }
  if (typeof data === "object" && Object.keys(data).length === 0) {
    return { isValid: false, error: "Données vides reçues du serveur" };
  }
  return { isValid: true, error: null };
};

// دالة مساعدة لمعالجة الأخطاء
const handleApiError = (error: any, operation: string = "opération") => {
  console.error(`${operation} API Error:`, error);

  if (error.name === "AbortError") {
    return NextResponse.json({ error: "Délai d'attente de la requête dépassé" }, { status: 408 });
  }
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return NextResponse.json({ error: "Impossible de se connecter au serveur" }, { status: 503 });
  }
  if (error.message && error.message.includes("ECONNREFUSED")) {
    return NextResponse.json({ error: "Serveur indisponible" }, { status: 503 });
  }
  return NextResponse.json({ error: `Erreur lors de ${operation}. Veuillez réessayer.` }, { status: 500 });
};

// دالة مساعدة لتحليل الاستجابة
const parseApiResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Réponse serveur non JSON");
  }
  try {
    return await response.json();
  } catch (parseError) {
    console.error("Failed to parse JSON response:", parseError);
    throw new Error("Réponse serveur invalide");
  }
};

// GET مع كاش
export async function GET() {
  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "Configuration serveur manquante", message: "URL de l'API non configurée" },
        { status: 500 }
      );
    }

    const cacheKey = "contant-managers";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log("✅ Returning data from cache");
      return NextResponse.json({ success: true, data: cachedData, cached: true }, { status: 200 });
    }

    console.log("Fetching from API:", `${API_URL}/api/contant-managers`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${API_URL}/api/contant-managers`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await parseApiResponse(res);
    if (!res.ok) {
      const errorMessage = data?.error || data?.message || `Erreur ${res.status}: ${res.statusText}`;
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    const validation = validateApiResponse(data);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 204 });
    }

    setCache(cacheKey, data.data || data, 60 * 5); // تخزين 5 دقائق
    return NextResponse.json({ success: true, data: data.data || data, cached: false }, { status: 200 });

  } catch (error) {
    return handleApiError(error, "récupération des données");
  }
}

// POST مع حذف الكاش عند نجاح العملية
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "Configuration serveur manquante", message: "URL de l'API non configurée" },
        { status: 500 }
      );
    }
    if (!token) {
      return NextResponse.json(
        { error: "Token manquant", message: "Authentification requise" },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Données invalides", message: "Format JSON invalide" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(`${API_URL}/api/contant-managers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await parseApiResponse(res);
    if (!res.ok) {
      const errorMessage = data?.error || data?.message || `Erreur ${res.status}: ${res.statusText}`;
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    // حذف الكاش بعد نجاح العملية
    delCache("contant-managers");

    return NextResponse.json(
      { success: true, data: data.data || data, message: data.message || "Opération réussie" },
      { status: res.status || 200 }
    );

  } catch (error) {
    return handleApiError(error, "création");
  }
}