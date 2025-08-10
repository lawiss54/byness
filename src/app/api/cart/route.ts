import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * ✅ GET: استرجاع بيانات السلة من الخادم
 */
export async function GET() {
  try {
    
    if (!API_URL) {
      console.error("API_URL is not defined");
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
    }

    const cookieStore = await cookies();
    const existingKey = cookieStore.get('cart_key')?.value;
   

    const res = await fetch(`${API_URL}/api/cart/${existingKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json({ error: "Réponse serveur invalide" }, { status: 502 });
    }

    if (!res.ok) {
      const errorMessage =
        data?.error || data?.message || data?.data?.error || `Erreur ${res.status}: ${res.statusText}`;
      console.error("API Error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    if (!existingKey) {
      
      cookieStore.set('cart_key', data.data.cart_key , {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: false,
      });
    }


    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/cart error:", error);

    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Délai d'attente dépassé" }, { status: 408 });
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return NextResponse.json({ error: "Connexion au serveur échouée" }, { status: 503 });
    }

    return NextResponse.json({ error: "Erreur serveur inconnue" }, { status: 500 });
  }
}

/**
 * ✅ POST: إرسال تحديثات السلة إلى الخادم
 */
export async function PUT(request: NextRequest) {

  const cookieStore = cookies();
  const cartKey = (await cookieStore).get('cart_key')?.value;

  if (!cartKey) {
    return NextResponse.json({ error: 'Panier non identifié' }, { status: 400 });
  }

  try {
    if (!API_URL) {
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
    }

    const body = await request.json();

    const res = await fetch(`${API_URL}/api/cart/${cartKey}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Erreur parsing JSON:", parseError);
      return NextResponse.json({ error: "Réponse serveur invalide" }, { status: 502 });
    }

    if (!res.ok) {
      const errorMessage =
        data?.error || data?.message || data?.data?.error || `Erreur ${res.status}: ${res.statusText}`;
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    return NextResponse.json(data.data || data, { status: res.status });
  } catch (error: any) {
    console.error("POST /api/cart error:", error);

    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Délai d’attente dépassé" }, { status: 408 });
    }

    return NextResponse.json({ error: "Erreur lors de l’envoi de la commande" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const cookieStore = cookies();
  const cartKey = (await cookieStore).get('cart_key')?.value;

  if (!cartKey) {
    return NextResponse.json({ error: 'Panier non identifié' }, { status: 400 });
  }


  try {
    if (!API_URL) {
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
    }

    const body = await request.json();

    const res = await fetch(`${API_URL}/api/cart/${cartKey}`, {
      method: "DELETE", // أو PUT/UPDATE إذا أردت حسب الواجهة الخلفية
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Erreur parsing JSON:", parseError);
      return NextResponse.json({ error: "Réponse serveur invalide" }, { status: 502 });
    }

    if (!res.ok) {
      const errorMessage =
        data?.error || data?.message || data?.data?.error || `Erreur ${res.status}: ${res.statusText}`;
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    return NextResponse.json(data.data || data, { status: res.status });
  } catch (error: any) {
    console.error("DELETE /api/cart error:", error);

    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Délai d’attente dépassé" }, { status: 408 });
    }

    return NextResponse.json({ error: "Erreur lors de l’envoi de la commande" }, { status: 500 });
  }
}