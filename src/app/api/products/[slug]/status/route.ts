import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
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

      const { slug } = params;
      
      if (!slug) {
        return NextResponse.json(
          { error: "Slug du produit manquant" },
          { status: 400 }
        );
      }

      const body = await req.json();

      // استخدام PUT مع slug للتحديث
      const res = await fetch(`${API_URL}/api/product/${slug}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.error("Failed to parse JSON response", error);
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

        return NextResponse.json(
          { error: errorMessage },
          { status: res.status }
        );
      }

      return NextResponse.json(data.data || data, { status: res.status });

    } catch (Error) {
      console.error("Product PUT API Error:", Error);
      if (Error instanceof Error && Error.name === "AbortError") {
        return NextResponse.json(
          { error: "Délai d'attente de la requête dépassé" },
          { status: 408 }
        );
      }
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour status du produit" },
        { status: 500 }
      );
    }
}