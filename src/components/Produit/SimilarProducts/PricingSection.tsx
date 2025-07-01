import { memo } from "react";
import { SimilarProduct } from "./types";

interface PricingSectionProps {
  product: SimilarProduct;
  savings: number;
}

/**
 * PricingSection Component
 * 
 * Displays product pricing information with discounts and savings.
 * Memoized to prevent unnecessary re-renders.
 */
export const PricingSection: React.FC<PricingSectionProps> = memo(({ product, savings }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-brand-camel-500">
            {product?.price.toLocaleString()} DA
          </span>
          {product?.originalPrice && (
            <span className="text-sm text-brand-sage-400 line-through">
              {product?.originalPrice.toLocaleString()} DA
            </span>
          )}
        </div>
        {savings > 0 && (
          <span className="text-sm text-green-600 font-semibold">
            Économisez {savings?.toLocaleString()} DA
          </span>
        )}
      </div>
    </div>
  );
});

PricingSection.displayName = 'PricingSection';
