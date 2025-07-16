
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    
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

        const body = await req.json(); // البيانات المرسلة من المستخدم

        const res = await fetch(`${API_URL}/api/contant-managers/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data.message, {status: res.status})


}



