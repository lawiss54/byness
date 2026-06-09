import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.phone || !body.password) {
      return NextResponse.json(
        { error: "Phone and password are required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.data?.error || "Erreur de connexion" },
        { status: res.status }
      );
    }

    // تنظيف البيانات من التوكنات قبل الإرجاع
    const sanitizedData = {
      ...data,
      data: {
        ...data.data,
        access_token: undefined,
        refresh_token: undefined,
      },
    };

    // إنشاء response مرة واحدة
    const response = NextResponse.json(sanitizedData, { status: 200 });

    // تعيين access_token في الكوكيز (دائمًا)
    response.cookies.set("access_token", data.data.access_token, {
      httpOnly: true,
      secure: true, // اجعلها true في الإنتاج مع HTTPS
      maxAge: 4 * 60 * 60,
      sameSite: "lax",
      path: "/",
    });

    // تعيين refresh_token فقط إذا rememberMe مفعّل
    if (body.rememberMe && data.data.refresh_token) {
      response.cookies.set("refresh_token", data.data.refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 15, // 15 يوم
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      {
        error:
          "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.",
      },
      { status: 500 }
    );
  }
}
