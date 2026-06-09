'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Components - Split into separate files for better code splitting
import ProductImageGallery from './ProductDetailsPage/ProductImageGallery';
import ProductInfo from './ProductDetailsPage/ProductInfo';
import TrustSignals from './ProductDetailsPage/TrustSignals';

import type { ProductDetailsPageProps } from './ProductDetailsPage/type';
import { ANIMATION_VARIANTS } from './ProductDetailsPage/animation';
import { useFacebookPixelEvent } from '@/hooks/useFacebookPixelEvent';
import { useTiktokPixelEvent } from '@/hooks/useTiktokPixelEvent'

// Lazy load heavy components to improve initial page load
const SimilarProducts = dynamic(() => import('./SimilarProducts'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-3xl" />,
  ssr: false // Only load on client side to reduce server load
});

const ImageModal = dynamic(() => import('./ProductDetailsPage/ImageModal'), {
  ssr: false // Modal only needed on client interaction
});

export default function ProductDetailsPage({ 
  product,
  similarProducts
}: ProductDetailsPageProps) {
  // State management - Keep related state together
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);

  const { track } = useFacebookPixelEvent();
  const { trackTiktok } = useTiktokPixelEvent();
  
  // Memoized calculations to prevent unnecessary re-calculations
  const pricingData = useMemo(() => {
    const discountPercentage = product?.originalPrice 
      ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
      : 0;
    
    const savings = product?.originalPrice ? product?.originalPrice - product?.price : 0;
    const totalPrice = product?.price * quantity;
    
    return { discountPercentage, savings, totalPrice };
  }, [product?.price, product?.originalPrice, quantity]);

  // Memoized handlers to prevent unnecessary re-renders of child components
  const handleImageSelect = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleSizeSelect = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  }, []);

  const handleModalToggle = useCallback(() => {
    setShowImageModal(prev => !prev);
  }, []);

  // Product selection data for child components
  const selectionData = useMemo(() => ({
    selectedColor,
    selectedSize,
    quantity,
    totalPrice: pricingData?.totalPrice
  }), [selectedColor, selectedSize, quantity, pricingData?.totalPrice]);

  useEffect(() => {
    track('ViewContent', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'DZD',
    });
    trackTiktok('ViewContent', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'DZD',
    });
  }, [product, track, trackTiktok]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50">
      {/* Hero Section - Main product display */}
      <motion.section 
        className="py-8"
        variants={ANIMATION_VARIANTS?.container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery Component */}
            <motion.div variants={ANIMATION_VARIANTS?.item}>
              <ProductImageGallery
                product={product}
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
                onModalOpen={handleModalToggle}
                discountPercentage={pricingData?.discountPercentage}
              />
            </motion.div>

            {/* Product Information Component */}
            <motion.div variants={ANIMATION_VARIANTS?.item}>
              <ProductInfo
                product={product}
                pricingData={pricingData}
                selectionData={selectionData}
                onColorSelect={handleColorSelect}
                onSizeSelect={handleSizeSelect}
                onQuantityChange={handleQuantityChange}
              />
              
              {/* Trust Signals Component */}
              <TrustSignals />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Lazy-loaded sections for better performance */}
      <SimilarProducts 
        products={similarProducts}
        initialDisplayCount={3} // اختياري - افتراضي 4
        productsPerLoad={2} // اختياري - افتراضي 4
      />

      {/* Image Modal - Only rendered when needed */}
      {showImageModal && (
        <ImageModal
          product={product}
          selectedImage={selectedImage}
          onClose={handleModalToggle}
        />
      )}
    </div>
  );
}
