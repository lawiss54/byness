import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(
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
      const res = await fetch(`${API_URL}/api/product/${slug}`, {
        method: "PUT",
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
        { error: "Erreur lors de la mise à jour du produit" },
        { status: 500 }
      );
    }
}

export async function DELETE(
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

      // استخدام PUT مع slug للتحديث
      const res = await fetch(`${API_URL}/api/product/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      console.error("Product DELETE API Error:", Error);
      if (Error instanceof Error && Error.name === "AbortError") {
        return NextResponse.json(
          { error: "Délai d'attente de la requête dépassé" },
          { status: 408 }
        );
      }
      return NextResponse.json(
        { error: "Erreur lors de la suppression du produit" },
        { status: 500 }
      );
    }
}

export async function GET( request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }
    const { slug } = params;
      
      if (!slug) {
        return NextResponse.json(
          { error: "Slug du produit manquant" },
          { status: 400 }
        );
      }


    const res = await fetch(`${API_URL}/api/product/${slug}`, {
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
    console.error("Products API Error:", error);

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