"use client"

import { motion } from "framer-motion"
import { Tag } from "lucide-react"
import { AddToCartButtons } from "@/components/FashionShoppingButtons"
import { itemVariants } from "./animations/variants"
import type { Product } from "../types/product.types"
import { useRouter } from "next/navigation"

interface Props {
  product: Product
  index: number
}

export default function HeroProductCard({ product, index }: Props) {
  const router = useRouter()

  const goPageProduct = () => {
    router.push(`/produit/${product?.slug}`)
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl border border-brand-camel-100 
                 h-[32rem] w-full max-w-[20rem] 
                 sm:h-[36rem] sm:max-w-[22rem] 
                 md:h-[38rem] md:max-w-[24rem] 
                 lg:h-[40rem] lg:max-w-[25rem] 
                 flex flex-col transition-all duration-700 mx-auto"
      whileHover={{ y: -8, rotateY: 2, rotateX: 2 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Product Image + Badge */}
      <div
        onClick={goPageProduct}
        className="h-[16rem] sm:h-[18rem] md:h-[19rem] lg:h-[20rem] relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl"
      >
        <motion.img
          src={product?.images[0]}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge */}
        {product?.badge && (
          <motion.div
            className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6 bg-brand-camel-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2 + 1, type: "spring" }}
          >
            {product?.badge}
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col justify-between">
        <div onClick={goPageProduct}>
          <motion.h2
            className="text-lg sm:text-xl lg:text-2xl font-playfair font-semibold text-brand-darkGreen-500 mb-2 sm:mb-3 line-clamp-2"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product?.name}
          </motion.h2>
          <p className="text-xs sm:text-sm text-brand-darkGreen-400 font-secondary mb-4 sm:mb-6 line-clamp-3">
            {product?.description}
          </p>
        </div>

        <div className="flex items-center justify-evenly gap-2 sm:gap-4">
          <motion.div
            className="relative bg-brand-camel-100 text-brand-camel-500 border-2 border-dashed border-brand-camel-200 rounded-lg p-1.5 sm:p-2 shadow-lg font-bold"
            whileHover={{ scale: 1.2 }}
          >
            <h3 className="text-brand-darkGreen-500 text-base sm:text-lg lg:text-xl font-secondary whitespace-nowrap">
              {product?.price.toLocaleString()} DA
            </h3>
            <Tag
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 -rotate-90 text-brand-camel-400/40 fill-brand-camel-100"
              size={20}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
            <AddToCartButtons product={product} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
