import { Product } from '@/components/boutique/types/product.types';

interface ProductDetailsPageProps {
  product: Product;
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
    totalPrice: number;
  };
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onQuantityChange: (quantity: number) => void;
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