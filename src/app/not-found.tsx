'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  ShoppingBag, 
  Heart,
  Sparkles,
  MapPin,
  Compass,
  Star,
  Gift,
} from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  const suggestions = [
    { icon: ShoppingBag, text: "Découvrir nos collections", href: "/boutique" },
    { icon: Heart, text: "Voir nos coups de cœur", href: "/boutique" },
    { icon: Gift, text: "Offres spéciales", href: "/boutique" },
    { icon: Star, text: "Nouveautés", href: "/boutique" }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-brand-camel-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Interactive Mouse Follower */}
        <motion.div
          className="absolute w-32 h-32 bg-brand-camel-300/20 rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Number with Interactive Effects */}
          <motion.div
            className="relative mb-12"
            variants={itemVariants}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <motion.h1
              className="text-[12rem] md:text-[16rem] font-playfair font-bold text-brand-darkGreen-500/20 leading-none select-none"
              animate={{
                scale: isHovering ? 1.05 : 1,
                rotateY: isHovering ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              404
            </motion.h1>
            
            {/* Floating Icons around 404 */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-20 -left-20 text-brand-camel-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Compass size={40} />
                </motion.div>
                
                <motion.div
                  className="absolute -top-16 right-16 text-brand-sage-500"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MapPin size={32} />
                </motion.div>
                
                <motion.div
                  className="absolute bottom-12 -left-16 text-brand-darkGreen-500"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -15, 15, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Search size={36} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-brand-camel-500" />
              </motion.div>
              <span className="text-brand-darkGreen-600 font-semibold">
                Oops! Page introuvable
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-brand-darkGreen-500 mb-6">
              Vous semblez
              <motion.span
                className="block text-brand-camel-500"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                perdu(e)
              </motion.span>
            </h2>

            <p className="text-xl text-brand-darkGreen-400 font-secondary max-w-2xl mx-auto leading-relaxed">
              La page que vous recherchez n'existe pas ou a été déplacée. 
              Mais ne vous inquiétez pas, nous avons plein de belles choses à vous montrer !
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <Link href="/">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>Retour à l'accueil</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </motion.div>
              </motion.button>
            </Link>

          </motion.div>

          {/* Suggestions Carousel */}
          <motion.div
            className="mb-16"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-8">
              Que diriez-vous de découvrir...
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: currentSuggestion === index ? 1.05 : 1
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    scale: { duration: 0.3 }
                  }}
                >
                  <Link href={suggestion.href}>
                    <motion.div
                      className={`p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                        currentSuggestion === index 
                          ? 'ring-2 ring-brand-camel-500 bg-gradient-to-br from-brand-camel-50 to-white' 
                          : 'hover:bg-brand-sage-50'
                      }`}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="text-center"
                        animate={currentSuggestion === index ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <suggestion.icon 
                          className={`w-8 h-8 mx-auto mb-3 ${
                            currentSuggestion === index 
                              ? 'text-brand-camel-500' 
                              : 'text-brand-darkGreen-500'
                          }`} 
                        />
                        <p className="font-semibold text-brand-darkGreen-500">
                          {suggestion.text}
                        </p>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

        
        </motion.div>
      </div>
    </div>
  );
}