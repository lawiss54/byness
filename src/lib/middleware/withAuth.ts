import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Middleware API wrapper
export async function withAuthMiddleware(
  req: NextRequest, 
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // إذا لم يكن هناك access token ولكن يوجد refresh token
  if (!accessToken && refreshToken) {
    const refreshResult = await refreshAccessToken(refreshToken);
    
    if (refreshResult.success) {
      // إذا تم تحديث التوكن بنجاح، نفذ المعالج
      const response = await handler(req);
      
      // أضف التوكن الجديد إلى الـ response
      response.cookies.set('access_token', refreshResult.accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60, // 15 دقيقة
        sameSite: 'lax',
        path: '/',
      });
      
      return response;
    } else {
      // إذا فشل تحديث التوكن
      return NextResponse.json(
        { error: "Session expirée. Veuillez vous reconnecter." }, 
        { status: 401 }
      );
    }
  }

  // إذا لم يكن هناك أي توكن
  if (!accessToken) {
    return NextResponse.json(
      { error: "Token d'authentification manquant" }, 
      { status: 401 }
    );
  }

  // إذا كان هناك access token، نفذ المعالج
  return handler(req);
}

async function refreshAccessToken(refreshToken: string): Promise<{ success: boolean; accessToken?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      return { success: false };
    }

    const data = await res.json();
    const accessToken = data.data?.access_token;

    if (!accessToken) {
      return { success: false };
    }

    return { success: true, accessToken };
  } catch (err) {
    console.error("Erreur de renouvellement du token:", err);
    return { success: false };
  }
}





