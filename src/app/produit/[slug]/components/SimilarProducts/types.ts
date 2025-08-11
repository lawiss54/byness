import { Product } from '@/app/boutique/types';

/** * Props interface for SimilarProducts component * Includes optional callbacks for better integration with parent components */
export interface SimilarProductsProps {
  products: Product[]
  onViewAllClick?: () => void
  maxProducts?: number // Limit displayed products for performance
  loading?: boolean // Show loading state
  error?: string // Show error state
  initialDisplayCount?: number // Initial number of products to display (default: 4)
  productsPerLoad?: number // Number of products to load each time (default: 4)
}

/** * Props interface for ViewAllButton component */
export interface ViewAllButtonProps {
  onClick: () => void
  remainingCount: number
  productsPerLoad: number
}

/** * Animation configuration types * Used for customizing motion variants */
export interface AnimationVariants {
  containerVariants: {
    hidden: { opacity: number }
    visible: {
      opacity: number
      transition: {
        staggerChildren: number
        delayChildren: number
      }
    }
  }
  itemVariants: {
    hidden: { y: number; opacity: number }
    visible: {
      y: number
      opacity: number
      transition: {
        duration: number
        ease: number[]
      }
    }
  }
}
