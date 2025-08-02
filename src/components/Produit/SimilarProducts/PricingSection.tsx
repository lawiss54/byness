import type React from "react"
import { memo } from "react"
import type { SimilarProduct } from "./types"

interface PricingSectionProps {
  product: SimilarProduct
  savings: number
}

/**
 * PricingSection Component
 *
 * Displays product pricing information with discounts and savings.
 * Memoized to prevent unnecessary re-renders.
 */
export const PricingSection: React.FC<PricingSectionProps> = memo(({ product, savings }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span
            className="text-xl sm:text-2xl lg:text-2xl 
                           font-bold text-brand-camel-500 
                           whitespace-nowrap"
          >
            {product?.price.toLocaleString()} DA
          </span>
          {product?.originalPrice > 0 && (
            <span
              className="text-xs sm:text-sm 
                             text-brand-sage-400 line-through 
                             whitespace-nowrap"
            >
              {product?.originalPrice.toLocaleString()} DA
            </span>
          )}
        </div>
        {savings > 0 && (
          <span
            className="text-xs sm:text-sm 
                           text-green-600 font-semibold 
                           whitespace-nowrap"
          >
            Économisez {savings?.toLocaleString()} DA
          </span>
        )}
      </div>
    </div>
  )
})

PricingSection.displayName = "PricingSection"
