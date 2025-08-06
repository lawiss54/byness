'use client';

import { useState, useCallback } from 'react';

/**
 * Hook for managing sizes selection and custom sizes
 */
export function useSizesManager(initialSizes: string[] = []) {
  const [sizes, setSizes] = useState<string[]>(initialSizes);
  const [customSize, setCustomSize] = useState<string>('');
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);

  const toggleSize = useCallback((size: string) => {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  }, []);

  const addCustomSize = useCallback(() => {
    if (customSize.trim()) {
      const sizeValue = customSize.trim().toUpperCase();
      if (!sizes.includes(sizeValue)) {
        setSizes(prev => [...prev, sizeValue]);
        setCustomSize('');
        setShowCustomSizeInput(false);
      }
    }
  }, [customSize, sizes]);

  const removeSize = useCallback((size: string) => {
    setSizes(prev => prev.filter(s => s !== size));
  }, []);

  const toggleCustomSizeInput = useCallback(() => {
    setShowCustomSizeInput(prev => !prev);
  }, []);

  return {
    sizes,
    setSizes,
    customSize,
    setCustomSize,
    showCustomSizeInput,
    toggleSize,
    addCustomSize,
    removeSize,
    toggleCustomSizeInput
  };
}
