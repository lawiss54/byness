import { NextResponse, NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const startTime = Date.now();

  try {
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const res = await fetch(`${API_URL}/api/wilayas-with-shipping`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 0 }, 
      cache: "no-store", 
    });

    const fetchEndTime = Date.now();
    const fetchDuration = fetchEndTime - startTime;

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

    const totalDuration = Date.now() - startTime;
    const currentTime = new Date().toISOString();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Response-Time": `${totalDuration}ms`,
        "X-Fetch-Time": `${fetchDuration}ms`,
        "X-Timestamp": currentTime,
      },
    });
  } catch (error: any) {
    const errorTime = Date.now() - startTime;
    const currentTime = new Date().toISOString();

    if (error.name === "AbortError") {
      return NextResponse.json(
        {
          error: "Délai d'attente de la requête dépassé",
          timestamp: currentTime,
          duration: `${errorTime}ms`,
        },
        {
          status: 408,
          headers: {
            "X-Error-Time": `${errorTime}ms`,
            "X-Error-Timestamp": currentTime,
          },
        }
      );
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "Impossible de se connecter au serveur",
          timestamp: currentTime,
          duration: `${errorTime}ms`,
        },
        {
          status: 503,
          headers: {
            "X-Error-Time": `${errorTime}ms`,
            "X-Error-Timestamp": currentTime,
          },
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.",
        timestamp: currentTime,
        duration: `${errorTime}ms`,
      },
      {
        status: 500,
        headers: {
          "X-Error-Time": `${errorTime}ms`,
          "X-Error-Timestamp": currentTime,
        },
      }
    );
  }
}

// إدارة الكاش (حتى لو الكاش معطل)
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const currentTime = new Date().toISOString();

  try {
    const body = await request.json();

    if (body.action === "revalidate") {
      const { revalidateTag } = await import("next/cache");
      revalidateTag("wilayas-data");

      const duration = Date.now() - startTime;

      return NextResponse.json(
        {
          message: "Cache wilayas-data revalidated successfully",
          timestamp: currentTime,
          duration: `${duration}ms`,
          tag: "wilayas-data",
        },
        {
          headers: {
            "X-Revalidate-Time": `${duration}ms`,
            "X-Revalidate-Timestamp": currentTime,
          },
        }
      );
    }

    if (body.action === "revalidate-path") {
      const { revalidatePath } = await import("next/cache");
      const path = body.path || "/api/wilayas-with-shipping";
      revalidatePath(path);

      const duration = Date.now() - startTime;

      return NextResponse.json(
        {
          message: `Path ${path} revalidated successfully`,
          timestamp: currentTime,
          duration: `${duration}ms`,
          path: path,
        },
        {
          headers: {
            "X-Revalidate-Time": `${duration}ms`,
            "X-Revalidate-Timestamp": currentTime,
          },
        }
      );
    }

    return NextResponse.json(
      {
        error: "Action non supportée. Utilisez 'revalidate' ou 'revalidate-path'",
        timestamp: currentTime,
        availableActions: ["revalidate", "revalidate-path"],
      },
      { status: 400 }
    );
  } catch (error: any) {
    const duration = Date.now() - startTime;

    return NextResponse.json(
      {
        error: "Erreur lors de la gestion du cache",
        timestamp: currentTime,
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}

// معلومات الكاش (ستكون ثابتة لأن الكاش معطل)
export async function PATCH() {
  const currentTime = new Date().toISOString();
  const cacheInfo = {
    strategy: "No Cache",
    revalidateTime: 0,
    cacheType: "no-store",
    tags: [],
    timestamp: currentTime,
    expiresAt: null,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
    management: {
      revalidateEndpoint: "POST /api/wilayas-with-shipping",
      revalidatePayload: {
        action: "revalidate",
      },
      pathRevalidatePayload: {
        action: "revalidate-path",
        path: "/api/wilayas-with-shipping",
      },
    },
  };

  return NextResponse.json(cacheInfo, {
    headers: {
      "X-Cache-Info-Timestamp": currentTime,
      "X-Cache-Strategy": "no-store",
    },
  });
}