'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package, CreditCard } from "lucide-react";
import { Product } from "@/components/Boutique/types/product.types";
import { useCart } from "./cart/CartContext";
import { useRouter } from "next/navigation";
import { Button } from "./shared/ui";
import { useCartCheckout } from "@/lib/CartCheckoutContext";
import { CartItem } from "@/lib/CartCheckoutContextType";



interface AddToCartButtonsProps {
  product: CartItem;
}

export const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCartCheckout()

  const handleAddToCart = () => {


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
  const router = useRouter();

  const handleBuyNow = () => {

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