import { Product } from '@/components/Boutique/ProductsSection/types/product.types';

// types/index.ts
export interface Category {
  name: string;
  icon: string;
  count: number;
  color?: string;
  id?: string;
}

export interface CategoriesSectionProps {
  categories: Category[];
  products: Product[];
  setfilteredProducts: (products: Product[]) => void;
  setSelectedCategoryCallBack: (category: string) => void;
}

