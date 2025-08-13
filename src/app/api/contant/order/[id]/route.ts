
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    
        if (!API_URL) {
            console.error("API_URL is not defined in environment variables");
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

        const body = await req.json(); // البيانات المرسلة من المستخدم

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(`${API_URL}/api/contant-managers/order/${$id}`, {
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

        const data = await res.json();
        

        return NextResponse.json(data.message, {status: res.status})


}


