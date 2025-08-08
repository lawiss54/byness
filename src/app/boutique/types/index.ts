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
  stockQuantity: number;
  isNew: boolean;
  isSale: boolean;
  discount: number;
  status: 'active' | 'inactive';
  heroSection: boolean;
  quantity?: number;
  colorName?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  status: string
  productsCount?: number;
  id?: string;
}

export interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
}

export type ViewMode = 'grid' | 'list';
export type SortType = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest';
