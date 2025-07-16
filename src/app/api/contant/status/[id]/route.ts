
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    try {
      if (!API_URL) {
        return NextResponse.json(
          { error: "Configuration serveur manquante" },
          { status: 500 }
        );
      }

      if (!token) {
        return NextResponse.json(
          { error: "Token manquant" },
          { status: 401 }
        );
      }
      const { id } = params;

      if (!id) {
        return NextResponse.json(
          { error: "ID du contant manquant" },
          { status: 400 }
        );
      }

      const body = await req.json();


      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(`${API_URL}/api/contant-managers/status/${id}`, {
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
        const errorMessage =
          data?.error ||
          data?.message ||
          `Erreur ${res.status}: ${res.statusText}`;

        return NextResponse.json(
          { error: errorMessage },
          { status: res.status }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: data.data || data,
          message: data.message || "Mise à jour réussie"
        },
        { status: 200 }
      );

    } catch (error) {
      return handleApiError(error, "mise à jour");
    }
}


// دالة مساعدة لتحليل الاستجابة
const parseApiResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Réponse serveur non JSON");
  }

  try {
    const data = await response.json();
    return data;
  } catch (parseError) {
    console.error("Failed to parse JSON response:", parseError);
    throw new Error("Réponse serveur invalide");
  }
};

const handleApiError = (error: any, operation: string = "opération") => {
  console.error(`${operation} API Error:`, error);

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

  if (error.message && error.message.includes("ECONNREFUSED")) {
    return NextResponse.json(
      { error: "Serveur indisponible" },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { error: `Erreur lors de ${operation}. Veuillez réessayer.` },
    { status: 500 }
  );
};

