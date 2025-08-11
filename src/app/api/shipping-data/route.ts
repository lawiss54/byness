import { NextResponse, NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const startTime = Date.now(); // بداية قياس الوقت

  try {
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const res = await fetch(`${API_URL}/api/wilayas-with-shipping`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Next.js built-in caching options
      next: {
        revalidate: 3600, // Cache for 1 hour (3600 seconds)
        tags: ['wilayas-data'] // Tags for cache invalidation
      },
      cache: 'force-cache' // Force use cache if available
    });

    const fetchEndTime = Date.now();
    const fetchDuration = fetchEndTime - startTime;

    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      return NextResponse.json(
        { error: "Réponse serveur invalide" },
        { status: 502 }
      );
    }

    if (!res.ok) {
      const errorMessage =
        data?.error ||
        data?.message ||
        data?.data?.error ||
        `Erreur ${res.status}: ${res.statusText}`;

      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        error: errorMessage,
        data: data,
      });

      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Aucune donnée reçue du serveur" },
        { status: 204 }
      );
    }
    const totalDuration = Date.now() - startTime;
    const currentTime = new Date().toISOString();
    const cacheExpiryTime = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour from now

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Browser caching headers
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
        // Custom timing headers
        'X-Response-Time': `${totalDuration}ms`,
        'X-Fetch-Time': `${fetchDuration}ms`,
        'X-Timestamp': currentTime,
        'X-Cache-Expires': cacheExpiryTime,
        'X-Cache-Duration': '3600s',
        'X-Cache-Tags': 'wilayas-data',
        'X-Cache-Type': 'nextjs-builtin'
      }
    });

  } catch (error: any) {
    const errorTime = Date.now() - startTime;
    const currentTime = new Date().toISOString();

    if (error.name === "AbortError") {
      return NextResponse.json(
        { 
          error: "Délai d'attente de la requête dépassé",
          timestamp: currentTime,
          duration: `${errorTime}ms`
        },
        { 
          status: 408,
          headers: {
            'X-Error-Time': `${errorTime}ms`,
            'X-Error-Timestamp': currentTime
          }
        }
      );
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return NextResponse.json(
        { 
          error: "Impossible de se connecter au serveur",
          timestamp: currentTime,
          duration: `${errorTime}ms`
        },
        { 
          status: 503,
          headers: {
            'X-Error-Time': `${errorTime}ms`,
            'X-Error-Timestamp': currentTime
          }
        }
      );
    }

    return NextResponse.json(
      {
        error: "Erreur serveur. Si le problème persiste, veuillez contacter le développeur du site.",
        timestamp: currentTime,
        duration: `${errorTime}ms`
      },
      { 
        status: 500,
        headers: {
          'X-Error-Time': `${errorTime}ms`,
          'X-Error-Timestamp': currentTime
        }
      }
    );
  }
}

// إضافة endpoint لإدارة الـ cache
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const currentTime = new Date().toISOString();
  
  try {
    const body = await request.json();
    
    if (body.action === 'revalidate') {
      // إعادة التحقق من cache tag محدد
      const { revalidateTag } = await import('next/cache');
      revalidateTag('wilayas-data');
      
      const duration = Date.now() - startTime;
        
      return NextResponse.json(
        { 
          message: "Cache wilayas-data revalidated successfully",
          timestamp: currentTime,
          duration: `${duration}ms`,
          tag: 'wilayas-data'
        },
        {
          headers: {
            'X-Revalidate-Time': `${duration}ms`,
            'X-Revalidate-Timestamp': currentTime
          }
        }
      );
    }
    
    if (body.action === 'revalidate-path') {
      // إعادة التحقق من مسار محدد
      const { revalidatePath } = await import('next/cache');
      const path = body.path || '/api/wilayas-with-shipping';
      revalidatePath(path);
      
      const duration = Date.now() - startTime;
      
      return NextResponse.json(
        { 
          message: `Path ${path} revalidated successfully`,
          timestamp: currentTime,
          duration: `${duration}ms`,
          path: path
        },
        {
          headers: {
            'X-Revalidate-Time': `${duration}ms`,
            'X-Revalidate-Timestamp': currentTime
          }
        }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Action non supportée. Utilisez 'revalidate' ou 'revalidate-path'",
        timestamp: currentTime,
        availableActions: ['revalidate', 'revalidate-path']
      }, 
      { status: 400 }
    );
    
  } catch (error: any) {
    const duration = Date.now() - startTime;
    
    return NextResponse.json(
      { 
        error: "Erreur lors de la gestion du cache",
        timestamp: currentTime,
        duration: `${duration}ms`
      }, 
      { status: 500 }
    );
  }
}

// إضافة endpoint للحصول على معلومات الـ cache
export async function PATCH() {
  const currentTime = new Date().toISOString();
  const cacheInfo = {
    strategy: "Next.js Built-in Cache",
    revalidateTime: 3600, // 1 hour
    cacheType: "force-cache",
    tags: ["wilayas-data"],
    timestamp: currentTime,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=7200"
    },
    management: {
      revalidateEndpoint: "POST /api/wilayas-with-shipping",
      revalidatePayload: {
        action: "revalidate"
      },
      pathRevalidatePayload: {
        action: "revalidate-path",
        path: "/api/wilayas-with-shipping"
      }
    }
  };
  
  
  return NextResponse.json(cacheInfo, {
    headers: {
      'X-Cache-Info-Timestamp': currentTime,
      'X-Cache-Strategy': 'nextjs-builtin'
    }
  });
}

