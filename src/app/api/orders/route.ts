import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { withAuthMiddleware } from "@/lib/middleware/withAuth";
import { rateLimiter } from "@/utils/rateLimiter";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const res = await fetch(`${API_URL}/api/order`, {
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

    return NextResponse.json(data || data, { status: 200 });
  } catch (error: any) {
    console.error("Orders API Error:", error);

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

export async function POST(req: NextRequest) {
  

    try {
      const ip =req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";

      const result = await rateLimiter.limit(ip.toString());

      if (!result.allowed) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
          retryAfter: result.retryAfter,
        });
      }


      if (!API_URL) {
        return NextResponse.json(
          { error: "Configuration serveur manquante" },
          { status: 500 }
        );
      }

      const body = await req.json();

      const res = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      let data;
      try{
        data = await res.json();
      }catch (error) {
        console.error("Failed to parse JSON response", error);
        return NextResponse.json(
          {error: "Réponse serveur invalide"},
          {status: 502}
        );
      }

      if (!res.ok) {
        const errorMessage =
          data?.error ||
          data?.message ||
          data?.data?.error ||
          `Erreur ${res.status}: ${res.statusText}`;

        return NextResponse.json(
          { error: errorMessage },
          { status: res.status }
        );
      }

      return NextResponse.json(data.data || data, {status: res.status});

    }catch (Error) {
      console.error("Product POST API Error:", Error);
      if(Error instanceof Error && Error.name === "AbortError"){
        return NextResponse.json(
          {error: "Délai d'attente de la requéte dépassé"},
          {status: 408}
        );
      }
      return NextResponse.json(
        {error: "Erreur lors de la création de la product"},
        {status: 500}
      );
    }

}

