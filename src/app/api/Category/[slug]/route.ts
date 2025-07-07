import { withAuthMiddleware } from '@/lib/middleware/withAuth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;

    return withAuthMiddleware(request, async (req) => {
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

        const res = await fetch(`${API_URL}/api/category/${slug}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data.message, {status: res.status})

    })

}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  return withAuthMiddleware(request, async () => {
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

    try {
      const res = await fetch(`${API_URL}/api/category/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      return NextResponse.json(data.message, { status: res.status });
    } catch (error: any) {
      console.error("Erreur lors de la suppression :", error);
      return NextResponse.json(
        { error: "Erreur lors de la suppression de la catégorie" },
        { status: 500 }
      );
    }
  });
}