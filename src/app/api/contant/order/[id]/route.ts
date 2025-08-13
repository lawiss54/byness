import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
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

        const body = await req.json();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(`${API_URL}/api/contant-managers/order/${id}`, {
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

        const data = await res.json();

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

        return NextResponse.json(data, { status: res.status });

    } catch (error) {
        console.error("API route error:", error);
        
        // Handle AbortError specifically
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { error: "Timeout de la requête" },
                { status: 408 }
            );
        }

        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}