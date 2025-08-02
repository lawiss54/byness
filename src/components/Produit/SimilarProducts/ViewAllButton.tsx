"use client"

import type React from "react"

import { memo } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { ViewAllButtonProps } from "./types"

const ViewAllButton: React.FC<ViewAllButtonProps> = memo(({ onClick, remainingCount, productsPerLoad }) => {
  // Calculate how many products will be shown next
  const nextLoadCount = Math.min(productsPerLoad, remainingCount)
  const remainingProducts = remainingCount // Declare the variable here

  return (
    <motion.div
      className="text-center mt-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-darkGreen-500 hover:bg-brand-darkGreen-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span>
        Afficher plus ({nextLoadCount} sur {remainingProducts} produits restants)
        </span>
        <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
})

ViewAllButton.displayName = "ViewAllButton"

export default ViewAllButton
