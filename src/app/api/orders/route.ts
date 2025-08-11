
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from "next/headers";
import { getFingerprint } from "@/lib/getFingerprint";
import { rateLimiter } from "@/lib/rateLimiter";
 { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = "force-dynamic"; // يمنع ISR من Next.js
export const revalidate = 0; // ضمان إضافي لتعطيل التخزين المؤقت

export async function GET() {
  try {
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        }
      );
    }

    const res = await fetch(`${API_URL}/api/order`, {
      cache: "no-store", // ⬅ يمنع التخزين المؤقت من fetch
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      return NextResponse.json(
        { error: "Réponse serveur invalide" },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        }
      );
    }

    if (!res.ok) {
      const errorMessage =
        data?.error ||
        data?.message ||
        data?.data?.error ||
        `Erreur ${res.status}: ${res.statusText}`;

      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        error: errorMessage,
        data: data,
      });

      return NextResponse.json(
        { error: errorMessage },
        {
          status: res.status,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Aucune donnée reçue du serveur" },
        {
          status: 204,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: any) {
    console.error("Orders API Error:", error);

    let status = 500;
    let message =
      "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.";

    if (error.name === "AbortError") {
      status = 408;
      message = "Délai d'attente de la requête dépassé";
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      status = 503;
      message = "Impossible de se connecter au serveur";
    }

    return NextResponse.json(
      { error: message },
      {
        status,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    const fingerprint = getFingerprint(req);
    const { success } = await rateLimiter.limit(fingerprint);

    if (!success) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer après quelques secondes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const response = await fetch(`${API_URL}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error('Failed to parse JSON response', error);
      return NextResponse.json(
        { error: 'Réponse serveur invalide' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      const errorMessage =
        data?.error ||
        data?.message ||
        data?.data?.error ||
        `Erreur ${response.status}: ${response.statusText}`;

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(data.data || data, { status: response.status });
  } catch (error: any) {
    console.error('Product POST API Error:', error);

    if (error?.name === 'AbortError') {
      return NextResponse.json(
        { error: "Délai d'attente de la requête dépassé" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}