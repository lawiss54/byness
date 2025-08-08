'use client';

/**
 * Service for product form API operations
 */

export async function saveProductService(
  url: string, 
  method: string, 
  productData: any
): Promise<any> {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(productData)
  });

  const responseData = await res.json();

  if (!res.ok) {
    const error = new Error(responseData.error || 'Erreur lors de la sauvegarde');
    (error as any).status = res.status;
    throw error;
  }

  return responseData;
}
