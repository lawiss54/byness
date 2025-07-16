import { Product } from '@/components/boutique/types/product.types';

const API_URL = process.env.NEXT_PUBLIC_LOCAL_URL || 'https://byness.vercel.app';

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/products/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
    },
  });
  const json = await res.json();
  return transformProduct(json.data);
}

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

