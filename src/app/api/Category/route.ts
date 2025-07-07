import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withAuthMiddleware } from "@/lib/middleware/withAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    // التحقق من وجود API_URL
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const res = await fetch(`${API_URL}/api/category`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // إضافة timeout للطلب
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    // محاولة قراءة البيانات حتى لو فشل الطلب
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
      // تحسين معالجة الأخطاء
      const errorMessage =
        data?.error ||
        data?.message ||
        data?.data?.error ||
        `Erreur ${res.status}: ${res.statusText}`;

      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        error: errorMessage,
        data: data
      });

      return NextResponse.json(
        { error: errorMessage },
        { status: res.status }
      );
    }

    // التحقق من تنسيق البيانات
    if (!data) {
      return NextResponse.json(
        { error: "Aucune donnée reçue du serveur" },
        { status: 204 }
      );
    }

    // إرجاع البيانات - يمكن إرجاع data.data إذا كانت البيانات مدفونة في خاصية data
    return NextResponse.json(data.data || data, { status: 200 });

  } catch (error) {
    console.error("Categories API Error:", error);

    // معالجة أنواع مختلفة من الأخطاء
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
        error: "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.",
      },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  return withAuthMiddleware(request, async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;

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

      const body = await req.json();

      const res = await fetch(`${API_URL}/api/category`, {
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

        return NextResponse.json(
          { error: errorMessage },
          { status: res.status }
        );
      }

      return NextResponse.json(data.data || data, { status: res.status });

    } catch (error) {
      console.error("Categories POST API Error:", error);

      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json(
          { error: "Délai d'attente de la requête dépassé" },
          { status: 408 }
        );
      }

      return NextResponse.json(
        { error: "Erreur lors de la création de la catégorie" },
        { status: 500 }
      );
    }
  });
}


export async function DELETE(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID de catégorie requis" },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      // DELETE requests might not return JSON, so this is OK
      if (res.ok) {
        return NextResponse.json(
          { message: "Catégorie supprimée avec succès" },
          { status: 200 }
        );
      }
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

      return NextResponse.json(
        { error: errorMessage },
        { status: res.status }
      );
    }

    return NextResponse.json(
      data.data || data || { message: "Catégorie supprimée avec succès" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Categories DELETE API Error:", error);

    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "Délai d'attente de la requête dépassé" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la suppression de la catégorie" },
      { status: 500 }
    );
  }
}