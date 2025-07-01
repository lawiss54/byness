import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ProductImageGalleryProps } from './type';


const ProductImageGallery = memo<ProductImageGalleryProps>(({
  product,
  selectedImage,
  onImageSelect,
  onModalOpen,
  discountPercentage
}) => {
  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-sage-100 to-brand-camel-100 shadow-2xl">
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full cursor-zoom-in"
          onClick={onModalOpen}
        >
          <Image
            src={product.images[selectedImage]}
            alt={`${product?.name} - Vue principale`}
            fill
            className="object-cover hover:scale-110 transition-transform duration-700"
            priority // High priority for main product image
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            quality={85} // Optimized quality for web
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R6i+GCWZg4DK4Dg5GUIPqDxXHx72tNVFUQOPRuWyDhTbONu/wDIuV3qtiznU3+pLTWTcLlHkdTdOjqajCnCzk5jR9f7mvOzl8aHbVgNT9gxFGDdJhHDjpCAEJIAQ=" // Optimized blur placeholder
          />
        </motion.div>

        {/* Product Badge */}
        <motion.div
          className="absolute top-4 left-4 bg-brand-camel-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        >
          {product?.badge}
        </motion.div>

        {/* Discount Badge - Only show if there's a discount */}
        {discountPercentage > 0 && (
          <motion.div
            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
          >
            -{discountPercentage}%
          </motion.div>
        )}

        {/* Stock Status Indicator */}
        <motion.div
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div 
              className={`w-2.5 h-2.5 rounded-full ${
                product?.inStock ? 'bg-green-500' : 'bg-red-500'
              }`} 
            />
            <span className="text-xs font-medium text-brand-darkGreen-600">
              {product?.inStock 
                ? `En stock (${product.stockQuantity})` 
                : 'Rupture de stock'
              }
            </span>
          </div>
        </motion.div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-4 gap-3">
        {product?.images.map((image, index) => (
          <motion.button
            key={`thumb-${index}`}
            className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
              selectedImage === index
                ? 'ring-3 ring-brand-camel-500 shadow-lg scale-105'
                : 'hover:ring-2 hover:ring-brand-camel-300 hover:scale-102'
            }`}
            onClick={() => onImageSelect(index)}
            whileHover={{ scale: selectedImage === index ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Voir l'image ${index + 1} de ${product.name}`}
          >
            <Image
              src={image}
              alt={`${product?.name} - Vue ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, (max-width: 1024px) 15vw, 10vw"
              quality={60} // Lower quality for thumbnails
              // Preload adjacent images for smooth navigation
              {...(Math.abs(index - selectedImage) <= 1 && { priority: true })}
            />
            
            {/* Active indicator overlay */}
            {selectedImage === index && (
              <motion.div
                className="absolute inset-0 bg-brand-camel-500/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-brand-camel-500 rounded-full" />
                </div>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Image Counter for Mobile */}
      <div className="md:hidden text-center">
        <span className="text-sm text-brand-darkGreen-400">
          {selectedImage + 1} / {product?.images.length}
        </span>
      </div>
    </div>
  );
});

ProductImageGallery.displayName = 'ProductImageGallery';

export default ProductImageGallery;