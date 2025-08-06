'use client';

import { useState, useCallback } from 'react';

/**
 * Hook for managing colors selection and custom colors
 */
export function useColorsManager(initialColors: string[] = []) {
  const [colors, setColors] = useState<string[]>(initialColors);
  const [customColor, setCustomColor] = useState<string>('#000000');
  const [showCustomColorInput, setShowCustomColorInput] = useState(false);

  const toggleColor = useCallback((color: string) => {
    setColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  }, []);

  const addCustomColor = useCallback(() => {
    if (customColor.trim()) {
      const colorValue = customColor.trim();
      if (!colors.includes(colorValue)) {
        setColors(prev => [...prev, colorValue]);
        setCustomColor('#000000');
        setShowCustomColorInput(false);
      }
    }
  }, [customColor, colors]);

  const removeColor = useCallback((color: string) => {
    setColors(prev => prev.filter(c => c !== color));
  }, []);

  const toggleCustomColorInput = useCallback(() => {
    setShowCustomColorInput(prev => !prev);
  }, []);

  return {
    colors,
    setColors,
    customColor,
    setCustomColor,
    showCustomColorInput,
    toggleColor,
    addCustomColor,
    removeColor,
    toggleCustomColorInput
  };
}
