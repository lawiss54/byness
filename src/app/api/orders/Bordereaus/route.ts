
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export async function POST(req: NextRequest) {

    const body = await req.json();
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

    const res = await fetch(`${API_URL}/api/order/export-order-links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return NextResponse.json({ success: false, message: 'Erreur exportation' }, { status: 500 });
    }

    const blob = await res.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    

    return new NextResponse(buffer, {
        headers: {
            'Content-Disposition': 'attachment; filename="orders-links.xlsx"',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
    });
}
