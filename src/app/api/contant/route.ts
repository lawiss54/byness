import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// دالة مساعدة للتحقق من صحة البيانات
const validateApiResponse = (data: any) => {
  if (!data) {
    return { isValid: false, error: "Aucune donnée reçue du serveur" };
  }
  
  // التحقق من وجود بيانات فعلية
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return { isValid: false, error: "Données vides reçues du serveur" };
  }
  
  return { isValid: true, error: null };
};

// دالة مساعدة لمعالجة أخطاء API
const handleApiError = (error: any, operation: string = "opération") => {
  console.error(`${operation} API Error:`, error);
  
  if (error.name === "AbortError") {
    return NextResponse.json(
      { error: "Délai d'attente de la requête dépassé" },
      { status: 408 }
    );
  }
  
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return NextResponse.json(
      { error: "Impossible de se connecter au serveur" },
      { status: 503 }
    );
  }
  
  if (error.message && error.message.includes("ECONNREFUSED")) {
    return NextResponse.json(
      { error: "Serveur indisponible" },
      { status: 503 }
    );
  }
  
  return NextResponse.json(
    { error: `Erreur lors de ${operation}. Veuillez réessayer.` },
    { status: 500 }
  );
};

// دالة مساعدة لتحليل الاستجابة
const parseApiResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Réponse serveur non JSON");
  }
  
  try {
    const data = await response.json();
    return data;
  } catch (parseError) {
    console.error("Failed to parse JSON response:", parseError);
    throw new Error("Réponse serveur invalide");
  }
};

export async function GET() {
  try {
    // التحقق من وجود API_URL
    if (!API_URL) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { 
          error: "Configuration serveur manquante",
          message: "URL de l'API non configurée" 
        },
        { status: 500 }
      );
    }

    console.log("Attempting to fetch from:", `${API_URL}/api/contant-managers`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const res = await fetch(`${API_URL}/api/contant-managers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // تحليل الاستجابة
    const data = await parseApiResponse(res);

    if (!res.ok) {
      const errorMessage =
        data?.error ||
        data?.message ||
        data?.data?.error ||
        `Erreur ${res.status}: ${res.statusText}`;

      console.error("API Error Response:", {
        status: res.status,
        statusText: res.statusText,
        error: errorMessage,
        data: data
      });

      return NextResponse.json(
        { 
          error: errorMessage,
          status: res.status 
        },
        { status: res.status }
      );
    }

    // التحقق من صحة البيانات
    const validation = validateApiResponse(data);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 204 }
      );
    }

    console.log("API Response received successfully");

    // إرجاع البيانات مع معلومات إضافية
    return NextResponse.json(
      {
        success: true,
        data: data.data || data,
        message: data.message || "Données récupérées avec succès"
      },
      { status: 200 }
    );

  } catch (error) {
    return handleApiError(error, "récupération des données");
  }
}

export async function POST(req: NextRequest) {
  
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    try {
      // التحقق من التكوين
      if (!API_URL) {
        return NextResponse.json(
          { 
            error: "Configuration serveur manquante",
            message: "URL de l'API non configurée" 
          },
          { status: 500 }
        );
      }

      // التحقق من المصادقة
      if (!token) {
        return NextResponse.json(
          { 
            error: "Token manquant",
            message: "Authentification requise" 
          },
          { status: 401 }
        );
      }

      // قراءة البيانات من الطلب
      let body;
      try {
        body = await req.json();
      } catch (parseError) {
        return NextResponse.json(
          { 
            error: "Données invalides",
            message: "Format JSON invalide" 
          },
          { status: 400 }
        );
      }

      // التحقق من صحة البيانات المرسلة
      if (!body || typeof body !== 'object') {
        return NextResponse.json(
          { 
            error: "Données manquantes",
            message: "Aucune donnée fournie" 
          },
          { status: 400 }
        );
      }

      console.log("Sending POST request to:", `${API_URL}/api/contant-managers`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds for POST

      const res = await fetch(`${API_URL}/api/contant-managers`, {
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

      // تحليل الاستجابة
      const data = await parseApiResponse(res);

      if (!res.ok) {
        const errorMessage =
          data?.error ||
          data?.message ||
          data?.data?.error ||
          `Erreur ${res.status}: ${res.statusText}`;

        console.error("POST API Error Response:", {
          status: res.status,
          statusText: res.statusText,
          error: errorMessage,
          requestBody: body,
          responseData: data
        });

        return NextResponse.json(
          { 
            error: errorMessage,
            status: res.status 
          },
          { status: res.status }
        );
      }

      console.log("POST request successful");

      return NextResponse.json(
        {
          success: true,
          data: data.data || data,
          message: data.message || "Opération réussie"
        },
        { status: res.status || 200 }
      );

    } catch (error) {
      // معالجة أخطاء المصادقة
      if (error.message && error.message.includes("401")) {
        return NextResponse.json(
          { 
            error: "Token expiré",
            message: "Veuillez vous reconnecter" 
          },
          { status: 401 }
        );
      }

      return handleApiError(error, "création");
    }
}