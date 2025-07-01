
/**
 * Utility functions for performance optimization
 */

/**
 * Debounce function for expensive operations
 * Prevents excessive function calls during rapid user interactions
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events and frequent updates
 * Limits function execution to once per specified interval
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Image preloader for better perceived performance
 * Preloads critical images to reduce loading time
 * 
 * @param imageSrcs - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (imageSrcs: string[]): Promise<void[]> => {
  return Promise.all(
    imageSrcs.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    })
  );
};

/**
 * Format currency with proper localization
 * Optimized to avoid repeated Intl.NumberFormat instantiation
 * 
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'DZD')
 * @param locale - Locale string (default: 'fr-DZ')
 * @returns Formatted currency string
 */
const currencyFormatter = new Intl.NumberFormat('fr-DZ', {
  style: 'currency',
  currency: 'DZD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

/**
 * Calculate discount percentage
 * Memoized calculation helper for pricing components
 * 
 * @param originalPrice - Original price
 * @param currentPrice - Current price
 * @returns Discount percentage as integer
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

