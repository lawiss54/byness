
export interface ExclusiveProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  badge: string;
  rating: number;
  reviews: number;
}

export interface ExclusiveProductsProps {
  products: ExclusiveProduct[];
}

export interface AnimationVariants {
  containerVariants: any;
  itemVariants: any;
  backgroundVariants: any;
}