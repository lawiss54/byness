
/**
 * Responsive design utilities for better mobile experience
 */

/**
 * Breakpoint definitions matching Tailwind CSS
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Hook for responsive behavior
 */
export const useResponsiveColumns = () => {
  const [columns, setColumns] = React.useState(1);

  React.useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= breakpoints.lg) {
        setColumns(3);
      } else if (width >= breakpoints.md) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
};

/**
 * Get responsive image sizes based on columns
 */
export const getResponsiveImageSizes = (columns: number): string => {
  switch (columns) {
    case 3:
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 2:
      return '(max-width: 768px) 100vw, 50vw';
    default:
      return '100vw';
  }
};
