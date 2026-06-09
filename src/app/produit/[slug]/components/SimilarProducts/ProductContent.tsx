"use client"

import type React from "react"

import { memo } from "react"
import { motion } from "framer-motion"
import { PricingSection } from "./PricingSection"
import { useRouter } from "next/navigation"
import type { SimilarProduct } from "./types"

interface ProductContentProps {
  product: SimilarProduct
  savings: number
}

export const ProductContent: React.FC<ProductContentProps> = memo(({ product, savings }) => {
  const router = useRouter()

  const goPageProduct = () => {
    router.push(`/produit/${product?.slug}`)
  }

  return (
    <div
      onClick={goPageProduct}
      className="p-4 sm:p-5 lg:p-6 
                    flex-1 flex flex-col 
                    h-full min-h-0"
    >
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between h-full">
        <div className="flex-shrink-0">
          <motion.h3
            className="text-lg sm:text-xl lg:text-xl 
                       font-playfair font-semibold text-brand-darkGreen-500 
                       mb-2 sm:mb-3 
                       line-clamp-2 
                       leading-tight"
            whileHover={{ x: 5, color: "#da944a" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product.name}
          </motion.h3>

          <p
            className="font-medium 
                       text-xs sm:text-sm 
                       text-brand-darkGreen-600 
                       line-clamp-3 
                       leading-tight 
                       mb-4 sm:mb-6"
          >
            {product.description.slice(0, 120)}
            {product.description.length > 120 && "..."}
          </p>
        </div>

        {/* Pricing Section - Always at bottom */}
        <div className="mt-auto flex-shrink-0">
          <PricingSection product={product} savings={savings} />
        </div>
      </div>
    </div>
  )
})

ProductContent.displayName = "ProductContent"
