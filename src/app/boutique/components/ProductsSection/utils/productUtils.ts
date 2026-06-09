import { Product, SortType } from '../../../../types';

export const sortProducts = (products: Product[], sortBy: SortType): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    default:
      return sorted;
  }
};

export const filterProducts = (products: Product[], category: string): Product[] => {
  return category === 'all' 
    ? products 
    : products.filter(product => product.category === category);
};

