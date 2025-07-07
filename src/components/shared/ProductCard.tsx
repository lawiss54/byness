'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import Badge from './ui/Badge';
import {Button} from './ui/Button';
import type { Product } from '@/components/Boutique/types/product.types';

interface ProductCardProps {
  product: Product;
  index?: number;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard = memo<ProductCardProps>(({ 
  product, 
  index = 0, 
  showAddToCart = true,
  className = ""
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartProduct = {
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
    };
    
    addToCart(cartProduct);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-brand-camel-200 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/produit/${product.slug}`}>
        {/* Image Section */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge variant="info" size="sm">Nouveau</Badge>}
            {product.isSale && discountPercentage > 0 && (
              <Badge variant="error" size="sm">-{discountPercentage}%</Badge>
            )}
            {product.badge && (
              <Badge variant="warning" size="sm">{product.badge}</Badge>
            )}
          </div>

          {/* Add to Cart Overlay */}
          {showAddToCart && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                fullWidth
                icon={<ShoppingBag className="w-4 h-4" />}
                iconPosition="left"
              >
                Ajouter au panier
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-sm text-brand-darkGreen-600 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-brand-darkGreen-600 text-lg">
              {product.price.toLocaleString()} DA
            </span>
            {product.originalPrice > 0 && (
              <span className="text-gray-400 line-through text-sm">
                {product.originalPrice.toLocaleString()} DA
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;