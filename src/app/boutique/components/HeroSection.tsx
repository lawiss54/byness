"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { containerVariants } from "./HeroSection/animations/variants";
import dynamic from 'next/dynamic'
import { Product } from '../../types';


const HeroHeading = dynamic(
  () => import('./HeroSection/HeroHeading'),
  { ssr: false }
)
const HeroBackground = dynamic(
  () => import('./HeroSection/HeroBackground'),
  { ssr: false }
)
const HeroProductCard = dynamic(
  () => import('./HeroSection/HeroProductCard'),
  { ssr: false }
)

interface HeroSectionProps {
  heroProducts?: Product[];
}

export default function HeroSection({ heroProducts, }: HeroSectionProps) {
  
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentX, setCurrentX] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);


  const handleUserInteraction = useCallback((pause: boolean) => {
    setIsAutoScrolling(!pause);
  }, []);
  const products = useMemo(() => {
    return heroProducts?.length > 0 ? heroProducts : [];
  }, [heroProducts]);


  // Calculate carousel width
  useEffect(() => {
    if(typeof window === undefined) return;
    const updateCarouselWidth = () => {
      if (carousel?.current) {
        const scrollWidth = carousel.current.scrollWidth;
        const offsetWidth = carousel.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      }
    };

    updateCarouselWidth();
    window.addEventListener('resize', updateCarouselWidth);
    const timer = setTimeout(updateCarouselWidth, 100);

    return () => {
      window.removeEventListener('resize', updateCarouselWidth);
      clearTimeout(timer);
    };
  }, [carousel.current, heroProducts]); 


  // Auto-scroll effect - Fixed version
  useEffect(() => {
    if (!isAutoScrolling || width <= 0 || products.length <= 1) {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

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

    // Cleanup function
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isAutoScrolling, width, heroProducts]); // Keep only stable dependencies

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

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
            <NeonGradientCard neonColors={{ firstColor: "#0f3a37", secondColor: "#7d583a" }}>
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
                  style={{ x: currentX }}
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