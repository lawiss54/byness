"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from 'next/link'


const slides = [
  {
    title: "Nouvelle Collection Été 2025",
    subtitle: "Des looks légers et élégants pour chaque moment",
    ctaText: "Découvrir la collection",
    image: "/robe.jpg",
    animation: "fadeInUp"
  },
  {
    title: "Prêt-à-porter Femme",
    subtitle: "Confort et style à portée de main",
    ctaText: "Voir les nouveautés",
    image: "/robe2.jpg",
    animation: "slideInLeft"
  },
  {
    title: "Livraison rapide avec Yalidine",
    subtitle: "Commandez aujourd'hui, recevez rapidement",
    ctaText: "Commander maintenant",
    image: "/robe3.jpg",
    animation: "bounceIn"
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x > 50) {
      // Glisser vers la droite - slide précédent
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (info.offset.x < -50) {
      // Glisser vers la gauche - slide suivant
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  

  // دالة لإرجاع حركة النص حسب نوع الأنيميشن
  const getTextAnimation = (animationType: string) => {
    switch(animationType) {
      case 'fadeInUp':
        return {
          title: { y: 30, opacity: 0 },
          subtitle: { y: 20, opacity: 0 },
          button: { y: 25, opacity: 0 }
        };
      case 'slideInLeft':
        return {
          title: { x: -50, opacity: 0 },
          subtitle: { x: -30, opacity: 0 },
          button: { x: -40, opacity: 0 }
        };
      case 'bounceIn':
        return {
          title: { scale: 0.8, opacity: 0 },
          subtitle: { scale: 0.9, opacity: 0 },
          button: { scale: 0.8, opacity: 0 }
        };
      default:
        return {
          title: { y: 20, opacity: 0 },
          subtitle: { y: 20, opacity: 0 },
          button: { y: 20, opacity: 0 }
        };
    }
  };

  const currentSlide = slides[current];
  const animations = getTextAnimation(currentSlide.animation);

  return (
    <div className="h-80 bg-brand-darkGreen-500 relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center cursor-grab active:cursor-grabbing"
          style={{ backgroundImage: `url(${slides[current].image})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center h-full bg-black/50">
            <div className="text-center text-white px-6 md:px-12 max-w-4xl">
              <motion.div
                initial={animations.title}
                animate={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.3, 
                  duration: currentSlide.animation === 'bounceIn' ? 0.8 : 0.6,
                  type: currentSlide.animation === 'bounceIn' ? 'spring' : 'tween',
                  bounce: currentSlide.animation === 'bounceIn' ? 0.4 : 0
                }}
              >
                <h2 className="text-3xl md:text-5xl mb-4 font-bold">
                  {currentSlide.title}
                </h2>
              </motion.div>
              <motion.div
                initial={animations.subtitle}
                animate={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.5, 
                  duration: currentSlide.animation === 'bounceIn' ? 0.7 : 0.6,
                  type: currentSlide.animation === 'bounceIn' ? 'spring' : 'tween',
                  bounce: currentSlide.animation === 'bounceIn' ? 0.3 : 0
                }}
              >
                <p className="text-base md:text-xl mb-8">
                  {currentSlide.subtitle}
                </p>
              </motion.div>
              
              {/* CTA Button */}
              <motion.div
                initial={animations.button}
                animate={{ y: 0, x: 0, scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.7, 
                  duration: currentSlide.animation === 'bounceIn' ? 0.9 : 0.6,
                  type: currentSlide.animation === 'bounceIn' ? 'spring' : 'tween',
                  bounce: currentSlide.animation === 'bounceIn' ? 0.5 : 0
                }}
              >
                <Link
                  href="/boutique"
                  className="inline-flex items-center text-brand-sage-100 gap-3 bg-gradient-to-r from-brand-camel-500/20 to-brand-camel-600/50 hover:from-brand-camel-600 hover:to-brand-camel-700 font-semibold py-4 px-8 md:py-5 md:px-12 rounded-[4rem] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 shadow-2xl hover:shadow-brand-camel-500/25 backdrop-blur-sm border border-white/20 hover:border-white/30 text-sm md:text-lg group relative overflow-hidden shadow-md"
                >
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2  transition-all duration-300 group-hover:rotate-12">
                      <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className="font-bold tracking-wide font-primary">
                      {currentSlide.ctaText}
                    </span>
                    <div className="ml-2 p-1 rounded-full bg-white/20  transition-all duration-300">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    </div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full border transition-all duration-300 ${
              current === index
                ? "bg-white border-white scale-110"
                : "bg-white/30 border-white/30"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}