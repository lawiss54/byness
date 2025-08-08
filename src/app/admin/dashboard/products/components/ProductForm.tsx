'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Category, Product } from '@/app/admin/types';

// Components
import ProductFormHeader from './product-form/ProductFormHeader';
import BasicInfoSection from './product-form/BasicInfoSection';
import ClassificationSection from './product-form/ClassificationSection';
import ImagesSection from './product-form/ImagesSection';
import ColorsSection from './product-form/ColorsSection';
import SizesSection from './product-form/SizesSection';
import ProductFormFooter from './product-form/ProductFormFooter';

// Hooks
import { useProductForm } from './hooks/form/useProductForm';
import { useImageUpload } from './hooks/form/useImageUpload';
import { useColorsManager } from './hooks/form/useColorsManager';
import { useSizesManager } from './hooks/form/useSizesManager';

// Utils
import { predefinedColors, predefinedSizes } from './utils/form/formHelpers';

interface ProductFormProps {
  product?: Product | null;
  getCategories?: Category[];
  onSave: (data: Partial<Product>) => void;
  onClose: () => void;
}

/**
 * Main product form component with organized sections
 */
export default function ProductForm({ 
  getCategories, 
  product, 
  onSave, 
  onClose 
}: ProductFormProps) {
  // Custom Hooks
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    isSubmitting,
    discountPercentage,
    handlePriceChange,
    onSubmit
  } = useProductForm(product, onSave);

  const {
    images,
    setImages,
    handleImageUpload,
    removeImage
  } = useImageUpload(product?.images);

  const {
    colors,
    setColors,
    customColor,
    setCustomColor,
    showCustomColorInput,
    toggleColor,
    addCustomColor,
    removeColor,
    toggleCustomColorInput
  } = useColorsManager(product?.colors);

  const {
    sizes,
    setSizes,
    customSize,
    setCustomSize,
    showCustomSizeInput,
    toggleSize,
    addCustomSize,
    removeSize,
    toggleCustomSizeInput
  } = useSizesManager(product?.sizes);

  // Update form values when arrays change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setValue('colors', colors);
    setValue('sizes', sizes);
  }, [colors, sizes, setValue]);

  // Handle form submission
  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data, images, colors, sizes);
  });

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <ProductFormHeader product={product} onClose={onClose} />

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleFormSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <BasicInfoSection
              register={register}
              errors={errors}
              categories={getCategories || []}
              product={product}
              discountPercentage={discountPercentage}
              onPriceChange={handlePriceChange}
            />

            {/* Product Classification */}
            <ClassificationSection register={register} />

            {/* Images */}
            <ImagesSection
              images={images}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />

            {/* Colors */}
            <ColorsSection
              colors={colors}
              predefinedColors={predefinedColors}
              customColor={customColor}
              showCustomColorInput={showCustomColorInput}
              onToggleColor={toggleColor}
              onSetCustomColor={setCustomColor}
              onToggleCustomColorInput={toggleCustomColorInput}
              onAddCustomColor={addCustomColor}
              onRemoveColor={removeColor}
            />

            {/* Sizes */}
            <SizesSection
              sizes={sizes}
              predefinedSizes={predefinedSizes}
              customSize={customSize}
              showCustomSizeInput={showCustomSizeInput}
              onToggleSize={toggleSize}
              onSetCustomSize={setCustomSize}
              onToggleCustomSizeInput={toggleCustomSizeInput}
              onAddCustomSize={addCustomSize}
              onRemoveSize={removeSize}
            />
          </form>
        </div>

        {/* Footer */}
        <ProductFormFooter
          product={product}
          isSubmitting={isSubmitting}
          onClose={onClose}
          onSubmit={handleFormSubmit}
        />
      </motion.div>
    </motion.div>
  );
}
