import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Erreur de rafraîchissement' }, { status: res.status });
    }

    const accessToken = data.data.access_token;

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token not found' }, { status: 500 });
    }

    const response = NextResponse.json({ message: 'Token refreshed' });

    // تحديث الـ access_token
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Refresh token error:', err);
    return NextResponse.json(
      {
        error:
          'Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.',
      },
      { status: 500 }
    );
  }
}
