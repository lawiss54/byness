import { Product } from '@/components/Boutique/ProductsSection/types/product.types';

interface ProductDetailsPageProps {
  product: Product;
  similarProducts: Product[];
  exclusiveProducts: Product[];
}

interface ProductInfoProps {
  product: Product;
  pricingData: {
    discountPercentage: number;
    savings: number;
    totalPrice: number;
  };
  selectionData: {
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    isWishlisted: boolean;
    totalPrice: number;
  };
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onQuantityChange: (quantity: number) => void;
  onWishlistToggle: () => void;
}

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface ProductImageGalleryProps {
  product: Product;
  selectedImage: number;
  onImageSelect: (index: number) => void;
  onModalOpen: () => void;
  discountPercentage: number;
}

interface ImageModalProps {
  product: Product;
  selectedImage: number;
  onClose: () => void;
}

export type { Product, ProductDetailsPageProps, ProductInfoProps, ProductTabsProps, ProductImageGalleryProps, ImageModalProps };