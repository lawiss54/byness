'use client';

import { useState, useCallback } from 'react';

/**
 * Hook for managing image upload functionality
 */
export function useImageUpload(initialImages: string[] = []) {
  const [images, setImages] = useState<string[]>(initialImages);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    images,
    setImages,
    handleImageUpload,
    removeImage
  };
}
