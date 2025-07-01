'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  Eye, 
  Crown, 
  Sparkles, 
  Gift,
  Timer,
  Users,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { AddToCartButtons, BuyNowButtons } from '@/components/FashionShoppingButtons';

interface ExclusiveProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  badge: string;
  rating: number;
  reviews: number;
}

interface ExclusiveProductsProps {
  products: ExclusiveProduct[];
}

export default function ExclusiveProducts({ products }: ExclusiveProductsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  // Countdown timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, #2d433a, #4a7c6a, #da944a)",
        "linear-gradient(45deg, #4a7c6a, #da944a, #2d433a)",
        "linear-gradient(45deg, #da944a, #2d433a, #4a7c6a)",
        "linear-gradient(45deg, #2d433a, #4a7c6a, #da944a)",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        variants={backgroundVariants}
        animate="animate"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-6 h-6 text-yellow-500" />
            </motion.div>
            <span className="text-brand-darkGreen-600 font-bold text-lg">
              Collection Exclusive
            </span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-brand-camel-500" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Édition
            <motion.span
              className="block text-yellow-400"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Limitée
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 font-secondary max-w-3xl mx-auto mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Des pièces uniques et exclusives, créées en quantité limitée pour les connaisseurs d&apos;exception
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            className="inline-flex items-center gap-4 bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-2xl shadow-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 40px rgba(239, 68, 68, 0.8)",
                "0 0 20px rgba(239, 68, 68, 0.5)"
              ]
            }}
          >
            <Timer className="w-5 h-5" />
            <span className="font-semibold">Offre se termine dans:</span>
            <motion.span 
              className="font-mono text-xl font-bold"
              animate={{ scale: timeLeft % 60 === 0 ? [1, 1.1, 1] : 1 }}
            >
              {formatTime(timeLeft)}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Products */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              {/* Premium Card */}
              <motion.div
                className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden h-[700px] flex flex-col"
                whileHover={{
                  y: -15,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                animate={{
                  boxShadow: hoveredProduct === product.id
                    ? "0 25px 50px rgba(0,0,0,0.25)"
                    : "0 10px 30px rgba(0,0,0,0.15)"
                }}
              >
                {/* Premium Border Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-brand-camel-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(90deg, #fbbf24, #da944a, #fbbf24)",
                      "linear-gradient(90deg, #da944a, #fbbf24, #da944a)",
                      "linear-gradient(90deg, #fbbf24, #da944a, #fbbf24)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ padding: '3px', borderRadius: '24px' }}
                >
                  <div className="w-full h-full bg-white rounded-3xl" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="h-[450px] relative overflow-hidden rounded-t-3xl flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-brand-camel-100 to-yellow-200"
                      animate={{
                        background: hoveredProduct === product.id
                          ? "linear-gradient(to bottom right, #fef3c7, #f4e0c2, #fde68a)"
                          : "linear-gradient(to bottom right, #fef3c7, #faf1e1, #fde68a)",
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Premium Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.2 + 1, type: "spring" }}
                      >
                        <Crown className="w-4 h-4" />
                        {product.badge}
                      </motion.div>
                      
                      <motion.div
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-3 h-3" />
                        Quantité limitée
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                      className="absolute top-6 right-6 flex flex-col gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        x: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-5 h-5 text-brand-camel-600" />
                      </motion.button>
                      <motion.button
                        className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-5 h-5 text-red-500" />
                      </motion.button>
                    </motion.div>

                    {/* Premium Stats */}
                    <motion.div
                      className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-brand-darkGreen-600">
                          {product.rating}
                        </span>
                        <span className="text-xs text-brand-darkGreen-400">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
                        <Users className="w-4 h-4 text-brand-camel-500" />
                        <span className="text-xs text-brand-darkGreen-600 font-semibold">
                          VIP Exclusive
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <motion.h3
                        className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-4 line-clamp-2"
                        whileHover={{ x: 8, color: "#da944a" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {product.name}
                      </motion.h3>

                      <div className="flex items-center gap-3 mb-6">
                        <Gift className="w-5 h-5 text-brand-camel-500" />
                        <span className="text-sm text-brand-darkGreen-400">
                          Emballage cadeau premium inclus
                        </span>
                      </div>
                    </div>

                    {/* Premium Pricing */}
                    <div className="space-y-6">
                      <motion.div
                        className="relative bg-gradient-to-r from-yellow-50 to-brand-camel-50 p-6 rounded-2xl border-2 border-dashed border-yellow-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-brand-darkGreen-500 mb-1">
                              {product.price.toLocaleString()} DA
                            </div>
                            <div className="text-sm text-yellow-600 font-semibold">
                              Prix exclusif membre VIP
                            </div>
                          </div>
                          <motion.div
                            className="text-yellow-400/40"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Crown size={40} />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Premium Actions */}
                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <BuyNowButtons />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <AddToCartButtons />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-brand-camel-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  animate={hoveredProduct === product.id ? {
                    background: [
                      "linear-gradient(90deg, rgba(251,191,36,0.2), transparent, rgba(218,148,74,0.2))",
                      "linear-gradient(90deg, rgba(218,148,74,0.2), transparent, rgba(251,191,36,0.2))",
                      "linear-gradient(90deg, rgba(251,191,36,0.2), transparent, rgba(218,148,74,0.2))",
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* VIP Access CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="inline-flex flex-col items-center gap-6 bg-white/90 backdrop-blur-sm px-12 py-8 rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
                Accès VIP Exclusif
              </h3>
              <p className="text-brand-darkGreen-400 mb-6">
                Rejoignez notre club VIP pour accéder en priorité aux nouvelles collections exclusives
              </p>
            </div>
            
            <motion.button
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-brand-camel-500 hover:from-yellow-500 hover:to-brand-camel-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-5 h-5" />
              <span>Devenir Membre VIP</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}