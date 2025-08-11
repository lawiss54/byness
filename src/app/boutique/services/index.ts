import { Product, Category } from '../types';

// Helper function to transform raw product data into the Product type
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

// Helper function to transform raw category data into the Category type
const transformCategory = (raw: any): Category => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  description: raw.description,
  icon: raw.icon,
  color: raw.color,
  status: raw.status,
  productsCount: raw.productsCount,
});

// Base URL for the API. Using an environment variable is best practice.
// For now, I'll hardcode it based on the existing fetch calls.
const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, { next: { revalidate: 300 } }); // Revalidate every 5 minutes

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

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/Category`, { next: { revalidate: 300 } }); // Revalidate every 5 minutes

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categoryData = await res.json();
    const transformedCategories = categoryData.map(transformCategory);
    return transformedCategories.filter(c => c.status === 'active');
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return an empty array on error
  }
}
