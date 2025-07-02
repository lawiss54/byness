'use client'

import { useState, useEffect } from 'react';

export const useCountdownTimer = (initialTime: number = 3600) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return { timeLeft, formatTime };
};

export const useProductHover = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleHoverStart = (productId: string) => {
    setHoveredProduct(productId);
  };

  const handleHoverEnd = () => {
    setHoveredProduct(null);
  };

  return {
    hoveredProduct,
    handleHoverStart,
    handleHoverEnd,
  };
};