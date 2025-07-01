import React, { memo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { ImageModalProps } from './type';


const ImageModal = memo<ImageModalProps>(({
  product,
  selectedImage,
  onClose
}) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        // Navigate to previous image (implement if needed)
        break;
      case 'ArrowRight':
        // Navigate to next image (implement if needed)
        break;
    }
  }, [onClose]);

  // Setup keyboard listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="Image en plein écran"
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Fermer la vue agrandie"
        >
          <X className="w-6 h-6 text-gray-800" />
        </motion.button>

        {/* Image Container */}
        <motion.div
          className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={product?.images[selectedImage]}
              alt={`${product?.name} - Vue détaillée`}
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R6i+GCWZg4DK4Dg5GUIPqDxXHx72tNVFUQOPRuWyDhTbONu/wDIuV3qtiznU3+pLTWTcLlHkdTdOjqajCnCzk5jR9f7mvOzl8aHbVgNT9gxFGDdJhHDjpCAEJIAQ="
            />
          </div>

          {/* Image Information Overlay */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {product?.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Image {selectedImage + 1} sur {product?.images.length}
                </p>
              </div>
              
              {/* Navigation indicators (if multiple images) */}
              {product?.images.length > 1 && (
                <div className="flex gap-2">
                  {product?.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === selectedImage 
                          ? 'bg-brand-camel-500 scale-125' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

ImageModal.displayName = 'ImageModal';

export default ImageModal;