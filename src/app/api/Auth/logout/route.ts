import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    if (!API_URL) {
      return NextResponse.json(
        { 
          error: "Server configuration missing",
          message: "API URL not configured" 
        },
        { status: 500 }
      );
    }

    // Check authentication
    if (!token) {
      return NextResponse.json(
        { 
          error: "Token missing",
          message: "Authentication required" 
        },
        { status: 401 }
      );
    }

    // Call the logout-all API endpoint
    const res = await fetch(`${API_URL}/api/logout-all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    
    if (!res.ok) {
      const errorMessage =
        data?.error ||
        data?.message ||
        data?.data?.error ||
        `Error ${res.status}: ${res.statusText}`;

      console.error("Logout API Error Response:", {
        status: res.status,
        statusText: res.statusText,
        error: errorMessage,
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
    
    // Create successful response
    const response = NextResponse.json(
      {
        success: true,
        data: data.data || data,
        message: data.message || "Operation successful"
      },
      { status: res.status || 200 }
    );
    
    // Only delete tokens if the API call was successful
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    
    return response;
    
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if the API call fails, we might want to clear local cookies
    // This depends on your business logic
    const response = NextResponse.json(
      { 
        error: 'Server error',
        message: 'Unable to logout from all devices, but local session will be cleared'
      },
      { status: 500 }
    );
    
    // Optional: Clear cookies even on server error
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    
    return response;
  }
}