import { cache } from 'react';
import { Product } from '@/components/boutique/types/product.types';

const API_URL = process.env.NEXT_PUBLIC_LOCAL_URL || 'http://localhost:3000';

const headers = {
  Accept: 'application/json',
};

// ✅ تحويل البيانات الخام
export function transformProduct(raw: any): Product {
  return {
    id: raw.id,
    slug: raw.slug,
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
    isNew: raw.is_new,
    isSale: raw.is_sale,
    discount: raw.discount ? parseFloat(raw.discount) : 0,
    status: raw.status,
    heroSection: raw.hero_section,
  };
}

// ✅ جلب المنتج من خلال slug مع تفعيل الكاش
export const fetchProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${API_URL}/api/products/${slug}`, { headers });

    if (!res.ok) {
      console.error('Erreur lors de la récupération du produit:', res.statusText);
      return null;
    }

    const json = await res.json();
    return transformProduct(json.data);
  } catch (error) {
    console.error('Erreur fetchProductBySlug:', error);
    return null;
  }
});
