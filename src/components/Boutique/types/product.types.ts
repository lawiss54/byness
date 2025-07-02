export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge: string;
  colors: string[];
  sizes: string[];
  category: string;
  features: string[];
  stockQuantity: number;
  isNew: boolean;
  isSale: boolean;
  discount: number;
  sku: string;
  status: 'active' | 'inactive' | 'out-of-stock';
  heroSection: boolean;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  count?: number;
  id?: string;
}

export interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
}

export type ViewMode = 'grid' | 'list';
export type SortType = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest';