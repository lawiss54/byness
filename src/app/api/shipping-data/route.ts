import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TTL = 60 * 60; // ساعة واحدة بالكاش

export async function GET() {
  try {
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // ✅ محاولة جلب البيانات من الكاش
    const cached = getCache("wilayas-with-shipping");
    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    const res = await fetch(`${API_URL}/api/wilayas-with-shipping`, {
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
        { status: 502 }
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

      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Aucune donnée reçue du serveur" },
        { status: 204 }
      );
    }

    // ✅ حفظ البيانات في الكاش قبل الإرجاع
    setCache("wilayas-with-shipping", data, TTL);

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error("Wilayas API Error:", error);

    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "Délai d'attente de la requête dépassé" },
        { status: 408 }
      );
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return NextResponse.json(
        { error: "Impossible de se connecter au serveur" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.",
      },
      { status: 500 }
    );
  }
}