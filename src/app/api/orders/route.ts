import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Headers مشتركة لمنع التخزين المؤقت
const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

// دالة مساعدة للتحقق من API_URL
function checkApiUrl() {
  if (!API_URL) {
    console.error("API_URL is not defined in environment variables");
    return NextResponse.json(
      { error: "Configuration serveur manquante" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
  return null;
}

// دالة مساعدة لاستخراج رسالة الخطأ
function extractErrorMessage(data: any, status: number, statusText: string) {
  return (
    data?.error ||
    data?.message ||
    data?.data?.error ||
    `Erreur ${status}: ${statusText}`
  );
}

// دالة مساعدة لـ fetch مع JSON parsing
async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error("PARSE_ERROR");
  }

  return { res, data };
}

export async function GET() {
  const urlError = checkApiUrl();
  if (urlError) return urlError;

  try {
    const { res, data } = await fetchJson(`${API_URL}/api/order`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage = extractErrorMessage(data, res.status, res.statusText);
      console.error("API Error:", { status: res.status, error: errorMessage });
      return NextResponse.json(
        { error: errorMessage },
        { status: res.status, headers: NO_CACHE_HEADERS }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Aucune donnée reçue du serveur" },
        { status: 204, headers: NO_CACHE_HEADERS }
      );
    }

    return NextResponse.json(data, { status: 200, headers: NO_CACHE_HEADERS });

  } catch (error: any) {
    return handleFetchError(error);
  }
}

export async function POST(req: NextRequest) {
  const urlError = checkApiUrl();
  if (urlError) return urlError;

  try {
    const body = await req.json();

    const { res, data } = await fetchJson(`${API_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorMessage = extractErrorMessage(data, res.status, res.statusText);
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    return NextResponse.json(data.data ?? data, { status: res.status });

  } catch (error: any) {
    return handleFetchError(error);
  }
}

// معالج مركزي للأخطاء
function handleFetchError(error: any): NextResponse {
  console.error("Fetch Error:", error);

  if (error?.message === "PARSE_ERROR") {
    return NextResponse.json(
      { error: "Réponse serveur invalide" },
      { status: 502, headers: NO_CACHE_HEADERS }
    );
  }
  if (error?.name === "AbortError") {
    return NextResponse.json(
      { error: "Délai d'attente de la requête dépassé" },
      { status: 408, headers: NO_CACHE_HEADERS }
    );
  }
  if (error?.name === "TypeError" && error.message.includes("fetch")) {
    return NextResponse.json(
      { error: "Impossible de se connecter au serveur" },
      { status: 503, headers: NO_CACHE_HEADERS }
    );
  }

  return NextResponse.json(
    { error: "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site." },
    { status: 500, headers: NO_CACHE_HEADERS }
  );
}