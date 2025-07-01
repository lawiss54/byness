"use client";

import { motion } from "framer-motion";
import { Eye, Tag } from "lucide-react";
import { AddToCartButtons } from "@/components/FashionShoppingButtons";
import { itemVariants } from "./animations/variants";
import type { Product } from "./types";

interface Props {
  product: Product;
  index: number;
  onQuickView: () => void;
}

export default function HeroProductCard({ product, index, onQuickView }: Props) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl border border-brand-camel-100 h-[40rem] flex flex-col transition-all duration-700"
      whileHover={{ y: -8, rotateY: 2, rotateX: 2 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Product Image + Badge + Quick View Button */}
      <div className="h-[20rem] relative overflow-hidden rounded-t-3xl">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge */}
        <motion.div
          className="absolute top-6 left-6 bg-brand-camel-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.2 + 1, type: "spring" }}
        >
          {product.badge}
        </motion.div>

        {/* Quick View Button */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            onClick={onQuickView}
            className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-5 h-5 text-brand-camel-600" />
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <motion.h3
            className="text-2xl font-playfair font-semibold text-brand-darkGreen-500 mb-3 line-clamp-2"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product.name}
          </motion.h3>
          <p className="text-sm text-brand-darkGreen-400 font-secondary mb-6 line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <motion.div
            className="relative bg-brand-camel-100 text-brand-camel-500 border-2 border-dashed border-brand-camel-200 rounded-lg p-2 shadow-lg font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-brand-darkGreen-500 font-secondary text-base whitespace-nowrap">
              {product.price.toLocaleString()} DA
            </h3>
            <Tag
              className="absolute -top-4 -right-4 -rotate-90 text-brand-camel-400/40 fill-brand-camel-100"
              size={25}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AddToCartButtons />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
