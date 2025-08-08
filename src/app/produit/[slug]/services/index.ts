import { Product } from '@/app/boutique/types'; // Reusing the main Product type

// This transform function is duplicated from the boutique service.
// In a larger refactor, this could be moved to a shared location.
const transformProduct = (raw: any): Product => ({
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
  heroSection: raw.hero_section
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/products/${slug}`, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Product not found
      }
      throw new Error(`Failed to fetch product with slug: ${slug}`);
    }

    const productData = await res.json();
    if (!productData) {
      return null;
    }

    return transformProduct(productData.data);
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null; // Return null on error
  }
}
