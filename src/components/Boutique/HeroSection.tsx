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
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentX, setCurrentX] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const handleUserInteraction = (pause: boolean) => {
    setIsAutoScrolling(!pause);
  };

  // Calculate carousel width
  useEffect(() => {
    const updateCarouselWidth = () => {
      if (carousel?.current) {
        const scrollWidth = carousel.current.scrollWidth;
        const offsetWidth = carousel.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      }
    };

    // Initial calculation
    updateCarouselWidth();
    
    // Recalculate on window resize
    window.addEventListener('resize', updateCarouselWidth);
    
    // Recalculate when products change
    const timer = setTimeout(updateCarouselWidth, 100);
    
    return () => {
      window.removeEventListener('resize', updateCarouselWidth);
      clearTimeout(timer);
    };
  }, [products]);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || width <= 0 || products.length <= 1) return;

    const startAutoScroll = () => {
      animationRef.current = setInterval(() => {
        setCurrentX(prev => {
          const newX = prev - 1; // Vitesse de défilement
          
          // Reset à la position initiale quand on atteint la fin
          if (Math.abs(newX) >= width + 100) {
            return 0;
          }
          
          return newX;
        });
      }, 20); // Intervalle d'animation
    };

    startAutoScroll();

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isAutoScrolling, width, products.length]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  return(
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
                  className="flex will-change-transform cursor-grab active:cursor-grabbing gap-2 sm:gap-3 md:gap-4"
                  animate={{ x: currentX }}
                  onDragStart={() => handleUserInteraction(true)}
                  onDragEnd={() => {
                    // Reprendre l'auto-scroll après 3 secondes
                    setTimeout(() => handleUserInteraction(false), 3000);
                  }}
                  onHoverStart={() => handleUserInteraction(true)}
                  onHoverEnd={() => handleUserInteraction(false)}
                >
                  {products.map((product, index) => (
                      <motion.div key={product?.id} className="min-w-[20rem] min-h-[25rem] p-2 flex-shrink-0">
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