
import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types/product.types';
import { ANIMATIONS } from './constants/animations';
import { Badge } from './components/ui/Badge';
import { ColorPalette } from './components/ui/ColorPalette';
import { OptimizedImage } from './components/ui/OptimizedImage';
import Link from 'next/link';
import { useCart } from "@/components/cart/CartContext";


interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {


  const {addToCart} = useCart();
  
 
  const handleAddToCart = () => {

    

    const passProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      category: product.category,
      images: product.images,
      colors: product.colors,
      color: product.colors?.[0] || null,
      colorName: product.colors?.[0] || null,
      sizes: product.sizes,
      size: product.sizes?.[0] || null
    }
    
    addToCart(passProduct);
    
  };

  return (
    <motion.div
      variants={ANIMATIONS?.item}
      className="group relative bg-brand-sage-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-brand-camel-200"
      whileHover={ANIMATIONS.card.hover}
      whileTap={ANIMATIONS.card.tap}
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory-100">
        <OptimizedImage
          src={product?.images[0]}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105"
        />

        {/* BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product?.isNew && <Badge type="new" />}
          {product?.isSale && product?.discount && (
            <Badge type="sale" discount={product?.discount} />
          )}
        </div>


        {/* ADD TO CART OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-brand-darkGreen-600 py-2 px-3 rounded-lg font-medium text-sm hover:bg-brand-camel-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-3">
       <Link href={`/produit/${product?.slug}`}>
        <h3 className="font-medium text-sm text-brand-darkGreen-600 mb-2 line-clamp-2 leading-tight">
          {product?.name}
        </h3>

        {/* PRICE */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-brand-darkGreen-600 text-lg">
            {product?.price} DA
          </span>
          {product?.originalPrice > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {product.originalPrice} DA
            </span>
          )}
        </div>

        {/* COLORS */}
        {product?.colors.length > 0 && <ColorPalette colors={product.colors} />}
       </Link>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

