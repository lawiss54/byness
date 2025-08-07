import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getCache, setCache, delCache } from "@/lib/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CACHE_TTL = 300; // 5 دقائق

// =================== PUT ===================
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = (await cookies()).get("access_token")?.value;

  if (!API_URL) {
    return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
  }
  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 401 });
  }

  const { slug } = params;
  if (!slug) {
    return NextResponse.json({ error: "Slug du produit manquant" }, { status: 400 });
  }

  const body = await req.json();
  const res = await fetch(`${API_URL}/api/product/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data?.error || "Erreur de mise à jour" }, { status: res.status });
  }

  // حذف الكاش بعد التحديث
  delCache(`product:${slug}`);

  return NextResponse.json(data.data || data, { status: res.status });
}

// =================== DELETE ===================
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = (await cookies()).get("access_token")?.value;

  if (!API_URL) {
    return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
  }
  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 401 });
  }

  const { slug } = params;
  if (!slug) {
    return NextResponse.json({ error: "Slug du produit manquant" }, { status: 400 });
  }

  const res = await fetch(`${API_URL}/api/product/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data?.error || "Erreur de suppression" }, { status: res.status });
  }

  // حذف الكاش بعد الحذف
  delCache(`product:${slug}`);

  return NextResponse.json(data.data || data, { status: res.status });
}

// =================== GET ===================
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!API_URL) {
    return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
  }

  const { slug } = params;
  if (!slug) {
    return NextResponse.json({ error: "Slug du produit manquant" }, { status: 400 });
  }

  const cacheKey = `product:${slug}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { status: 200 });
  }

  const res = await fetch(`${API_URL}/api/product/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data?.error || "Erreur de récupération" }, { status: res.status });
  }

  // حفظ البيانات في الكاش
  setCache(cacheKey, data, CACHE_TTL);

  return NextResponse.json(data || data, { status: 200 });
}