
/**
 * Core product interface for similar products
 * Extended with optional callback properties for better flexibility
 */
export interface SimilarProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge: string;
  colors?: string[];
  sizes?: string[];
  category: string;
  stockQuantity?: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  status?: 'active' | 'inactive';
  heroSection: boolean;
}

/**
 * Props interface for SimilarProducts component
 * Includes optional callbacks for better integration with parent components
 */
export interface SimilarProductsProps {
  products: SimilarProduct[];
  onProductClick?: (productId: string) => void;
  onViewAllClick?: () => void;
  maxProducts?: number; // Limit displayed products for performance
  loading?: boolean; // Show loading state
  error?: string; // Show error state
}

/**
 * Animation configuration types
 * Used for customizing motion variants
 */
export interface AnimationVariants {
  containerVariants: {
    hidden: { opacity: number };
    visible: {
      opacity: number;
      transition: {
        staggerChildren: number;
        delayChildren: number;
      };
    };
  };
  itemVariants: {
    hidden: { y: number; opacity: number };
    visible: {
      y: number;
      opacity: number;
      transition: {
        duration: number;
        ease: number[];
      };
    };
  };
}

