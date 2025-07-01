
import { memo } from 'react';
import { Grid, List } from 'lucide-react';
import { Category, ViewMode, SortType } from './types/product.types';

interface FilterSectionProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const FilterSection = memo(({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}: FilterSectionProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
      {/* CATEGORIES FILTER */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === 'all'
              ? 'bg-brand-camel-500 text-white'
              : 'bg-brand-ivory-100 text-brand-darkGreen-600 hover:bg-brand-camel-100'
          }`}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === category.name
                ? 'bg-brand-camel-500 text-white'
                : 'bg-brand-ivory-100 text-brand-darkGreen-600 hover:bg-brand-camel-100'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* SORT AND VIEW CONTROLS */}
      <div className="flex items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-camel-500"
        >
          <option value="default"> Tri par défaut </option>
          <option value="price-low">Prix : du plus bas au plus élevé </option>
          <option value="price-high">Prix : du plus élevé au plus bas</option>
          <option value="newest">Les plus récents</option>
        </select>

        <div className="flex bg-brand-ivory-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-white text-brand-camel-600 shadow-sm'
                : 'text-gray-500 hover:text-brand-camel-600'
            }`}
            aria-label="Vue grille"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-white text-brand-camel-600 shadow-sm'
                : 'text-gray-500 hover:text-brand-camel-600'
            }`}
            aria-label="Vue liste"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';
