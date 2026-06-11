
import type { Product, Category } from '@/app/admin/types';

/**
 * Service for products API calls
 */

const PRODUCTS_API_ROUTE = '/api/products';
const CATEGORIES_API_ROUTE = '/api/Category';

// Transform raw product data from API
function transformProduct(raw: any): Product {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    price: parseFloat(raw.price),
    originalPrice: parseFloat(raw.original_price),
    images: raw.images?.map((img: any) => img.image_path) || [],
    badge: raw.badge || undefined,
    colors: raw.colors?.map((color: any) => color.hex_code) || [],
    sizes: raw.sizes?.map((size: any) => size.name) || [],
    category: raw.category?.name || 'Inconnu',
    stockQuantity: raw.stock_quantity,
    status: raw.status,
    slug: raw.slug,
    isNew: raw.is_new,
    isSale: raw.is_sale,
    discount: raw.discount ? parseFloat(raw.discount) : undefined,
  };
}

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

export async function fetchProductsService(): Promise<Product[]> {
  try {
    const res = await fetch(PRODUCTS_API_ROUTE, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    const items = Array.isArray(data) ? data : data?.data ?? [];

    return items.map(transformProduct);
  } catch (error) {
    console.error('Failed to parse products response:', error);
    return [];
  }
}

export async function fetchCategoriesService(): Promise<Category[]> {
  try {
    const res = await fetch(CATEGORIES_API_ROUTE, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    const items = Array.isArray(data) ? data : data?.data ?? [];

    return items.map(transformCategory);
  } catch (error) {
    console.error('Failed to parse categories response:', error);
    return [];
  }
}

export async function deleteProductService(productSlug: string): Promise<void> {
  const res = await fetch(`/api/products/${productSlug}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Erreur lors de la suppression du produit');
  }
}

export async function updateProductStatusService(
  productSlug: string, 
  status: 'active' | 'inactive'
): Promise<void> {
  const res = await fetch(`/api/products/${productSlug}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ status })
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Erreur lors du changement de statut du produit');
  }
}