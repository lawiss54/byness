'use client';;
import React, { useState } from "react";
import { ShoppingCart, Package, CreditCard } from "lucide-react";
import { Product } from "@/components/boutique/types/product.types";
import { useRouter } from "next/navigation";
import { Button } from "./shared/ui";
import { useCartCheckout } from "@/lib/CartCheckoutContext";
import { CartItem } from "@/lib/CartCheckoutContextType";
import { useFacebookPixelEvent } from '@/hooks/useFacebookPixelEvent';



interface AddToCartButtonsProps {
  product: CartItem;
}

export const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const { track } = useFacebookPixelEvent();
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCartCheckout()

  const handleAddToCart = () => {

    track('AddToCart', {
      content_name: product?.name,
      content_ids: [product?.id],
      content_type: 'product',
      value: product?.price,
      currency: 'DZD',
    });
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant="secondary"
      size="md"
      icon={isAdded ? <Package className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      iconPosition="left"
    >
      {isAdded ? "Ajouté!" : "Ajouter"}
    </Button>
  );
};

interface BuyNowButtonsProps {
  product: Product;
}

export const BuyNowButtons: React.FC<BuyNowButtonsProps> = ({ product }) => {
  const { addToCart } = useCartCheckout();
  const { track } = useFacebookPixelEvent();
  const router = useRouter();

  const handleBuyNow = () => {
    track('AddToCart', {
      content_name: product?.name,
      content_ids: [product?.id],
      content_type: 'product',
      value: product?.price,
      currency: 'DZD',
    });

    const cartProduct: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0],
      quantity: product.quantity ?? 1,
      category: product.category,
      images: product.images,
      colors: product.colors,
      color: product.colors?.[0],
      colorName: product.colorName ?? null,
      sizes: product.sizes,
      size: product.size ,
      slug: product.slug,
      badge: product.badge,
      isNew: product.isNew,
      isSale: product.isSale,
      discount: product.discount
    };
    addToCart(cartProduct);

    router.push('/checkout');
  };

  return (
    <Button
      onClick={handleBuyNow}
      variant="primary"
      size="md"
      fullWidth
      icon={<CreditCard className="w-4 h-4" />}
      iconPosition="left"
    >
      Acheter maintenant
    </Button>
  );
};