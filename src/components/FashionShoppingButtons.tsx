'use client';;
import React, { useState } from "react";
import { ShoppingCart, Package, CreditCard } from "lucide-react";
import { Product } from "@/components/boutique/types/product.types";
import { useRouter } from "next/navigation";
import { Button } from "./shared/ui";
import { useCartActions } from '@/app/panier/store/cart';
import { CartItem } from '@/app/panier/store/cart';

import { useFacebookPixelEvent } from '@/hooks/useFacebookPixelEvent';
import { useTiktokPixelEvent } from '@/hooks/useTiktokPixelEvent'



interface AddToCartButtonsProps {
  product: CartItem;
}

export const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const { track } = useFacebookPixelEvent();
  const { trackTiktok } = useTiktokPixelEvent();
  const [isAdded, setIsAdded] = useState(false);

  const actions = useCartActions()

  const handleAddToCart = () => {

    track('AddToCart', {
      content_name: product?.name,
      content_ids: [product?.id],
      content_type: 'product',
      value: product?.price,
      currency: 'DZD',
    });
    trackTiktok('AddToCart', {
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
      image: product.images[0],
      images: product.images,
      colors: product.colors,
      color: product.colors?.[0] || null,
      colorName: product.colors?.[0] || null,
      sizes: product.sizes,
      size: product.sizes?.[0] || null,
      slug: product.slug,
      quantity: 1,
      category: product.category
    };
    actions.addToCart(cartProduct);
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
  const actions = useCartActions()

  const { track } = useFacebookPixelEvent();
  const { trackTiktok } = useTiktokPixelEvent();
  
  const router = useRouter();

  const handleBuyNow = () => {
    track('InitiateCheckout', {
      content_name: product?.name,
      content_ids: [product?.id],
      content_type: 'product',
      value: product?.price,
      currency: 'DZD',
    });
    trackTiktok('InitiateCheckout', {
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
      image: product.images[0],
      images: product.images,
      colors: product.colors,
      color: product.colors?.[0] || null,
      colorName: product.colors?.[0] || null,
      sizes: product.sizes,
      size: product.sizes?.[0] || null,
      slug: product.slug,
      quantity: 1,
      category: product.category
    };
    actions.addToCart(cartProduct);

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