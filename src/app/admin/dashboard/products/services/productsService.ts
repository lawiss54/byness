
import type { Product, Category } from '@/app/admin/types';

/**
 * Service for products API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

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
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data.data.map(transformProduct);
}

export async function fetchCategoriesService(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/api/Category`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data.data.map(transformCategory);
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
