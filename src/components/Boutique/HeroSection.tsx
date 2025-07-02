"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import HeroHeading from "./HeroSection/HeroHeading";
import HeroBackground from "./HeroSection/HeroBackground";
import HeroProductCard from "./HeroSection/HeroProductCard";
import { containerVariants } from "./HeroSection/animations/variants";
import type { Product } from "@/components/Boutique/types/product.types";

interface HeroSectionProps {
  heroProducts?: Product[];
}

export default function HeroSection({ heroProducts = [] }: HeroSectionProps) {
  const products = heroProducts.length > 0 ? heroProducts : [];

  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-darkGreen-50 via-brand-sage-50 to-brand-camel-50 py-24 min-h-full">
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HeroHeading />

          {/* Products Grid */}
          <motion.div
            className=" gap-12 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <NeonGradientCard neonColors={ {firstColor: "#0f3a37", secondColor: "#7d583a"} }>
              <div className="w-full overflow-hidden">
                <motion.div
                  ref={carousel}
                  drag="x"
                  whileDrag={{ scale: 0.95 }}
                  dragElastic={0.2}
                  dragConstraints={{ right: 0, left: -width }}
                  dragTransition={{ bounceDamping: 30 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex will-change-transform cursor-grab active:cursor-grabbing"
                >
                  {products.map((product, index) => (
                  
                      <motion.div key={product?.id} className="min-w-[20rem] min-h-[25rem] p-2">

                      
                          <HeroProductCard
                            key={product?.id}
                            product={product}
                            index={index}
                          />
                        
                      </motion.div>
                  
                ))}
                </motion.div>
              </div>
            </NeonGradientCard>
          </motion.div>
        </div>
      </section>
    </>
  );
}
