
import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';



interface ProductImageProps {
  product: SimilarProduct;
  discountPercentage: number;
  index: number;
}

/**
 * ProductImage Component
 * 
 * Handles the product image display with overlays and badges.
 * Optimized for loading performance and visual appeal.
 */
export const ProductImage: React.FC<ProductImageProps> = memo(({ 
  product, 
  discountPercentage, 
  index 
}) => {
  return (
    <div className="h-[320px] relative overflow-hidden rounded-t-3xl flex-shrink-0">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-sage-100 to-brand-camel-100"
        animate={{
          background: [
            "linear-gradient(to bottom right, #e3e7e3, #faf1e1)",
            "linear-gradient(to bottom right, #c7cfc7, #f4e0c2)",
            "linear-gradient(to bottom right, #e3e7e3, #faf1e1)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Optimized Next.js Image with proper loading strategy */}
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={index < 3} // Prioritize first 3 images for faster loading
        quality={85} // Optimize quality vs file size
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyKKFi8ij8ccbJbcbjEhB4faqWHRw+qH+DqRqgxfXkjq5vvX0/L3Eb7fRy90pJ5G1lkLrwJiYPL7lKOgx6kMpWZa2MZWU5P3XkVrJfUX/A72/qcIK7Kt2wRwJF0s4Y2bHfZNUgOi0UFCOBIGwFr3hEF5qbcHUNKdv8AJqTnyK9yzuVUxKcOcfFKWtPFnQY31cLxCgwHGvY/jI3FNvD8GxHc3Utn0R1EQbPTSFN/q1Q2VuDPU"
      />

      {/* Discount Badge - Only render if there's a discount */}
      {discountPercentage > 0 && (
        <motion.div
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
        >
          -{discountPercentage}%
        </motion.div>
      )}

      

     
    </div>
  );
});

ProductImage.displayName = 'ProductImage';
