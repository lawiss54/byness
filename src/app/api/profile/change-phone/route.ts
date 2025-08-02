import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  
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

      const body = await req.json();

      const res = await fetch(`${API_URL}/api/change-phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json",
           Authorization: `Bearer ${token}`,
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