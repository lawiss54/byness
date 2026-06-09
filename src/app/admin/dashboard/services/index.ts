import { Product, Category } from '../types';

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


export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`/api/products`); // Revalidate every 5 minutes

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const productData = await res.json();
    if (!productData.data) {
      console.error('Product data is not in the expected format:', productData);
      return [];
    }

    const transformedProducts = productData.data.map(transformProduct);
    return transformedProducts.filter(p => p.status === 'active');
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array on error
  }
}
