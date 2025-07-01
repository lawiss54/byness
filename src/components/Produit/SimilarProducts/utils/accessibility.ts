
/**
 * Accessibility utilities for better user experience
 * Ensures the component is usable by all users including those with disabilities
 */

/**
 * Generate accessible announcement for screen readers
 * @param productsCount - Number of products displayed
 * @returns Accessible announcement text
 */
export const generateAccessibleAnnouncement = (productsCount: number): string => {
  return `${productsCount} produits similaires disponibles. Utilisez les flèches pour naviguer.`;
};

/**
 * Handle keyboard navigation for product grid
 * @param event - Keyboard event
 * @param currentIndex - Current focused product index
 * @param totalProducts - Total number of products
 * @param onFocusChange - Callback for focus change
 */
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  currentIndex: number,
  totalProducts: number,
  onFocusChange: (index: number) => void
) => {
  const { key } = event;
  let newIndex = currentIndex;

  switch (key) {
    case 'ArrowRight':
      newIndex = currentIndex < totalProducts - 1 ? currentIndex + 1 : 0;
      break;
    case 'ArrowLeft':
      newIndex = currentIndex > 0 ? currentIndex - 1 : totalProducts - 1;
      break;
    case 'ArrowDown':
      newIndex = currentIndex + 3 < totalProducts ? currentIndex + 3 : currentIndex;
      break;
    case 'ArrowUp':
      newIndex = currentIndex - 3 >= 0 ? currentIndex - 3 : currentIndex;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = totalProducts - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  onFocusChange(newIndex);
};

