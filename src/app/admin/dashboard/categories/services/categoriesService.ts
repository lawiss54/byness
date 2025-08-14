import type { Category } from '@/app/admin/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

// Transform raw category data from API
function transformCategory(raw: any): Category {
  return {
    id: raw.id,
    value: raw.slug,
    label: raw.name,
    name: raw.name,
    description: raw.description,
    icon: raw.icon,
    color: raw.color,
    status: raw.status,
    productsCount: raw.products_count,
    slug: raw.slug,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/api/Category`);
  if (!res.ok) {
    // In a real app, you might want to log this error to a service
    console.error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    // Return empty array as a fallback to prevent crashes downstream
    return [];
  }
  
  try {
    const data = await res.json();
    // Assuming the API returns a direct array of categories
    if (Array.isArray(data)) {
      return data.map(transformCategory);
    } else {
      console.error("API response for categories is not an array:", data);
      return [];
    }
  } catch (error) {
    console.error("Failed to parse JSON for categories:", error);
    return [];
  }
}
