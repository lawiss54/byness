'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import LoginFeatures from './LoginFeatures';

export default function LoginPage() {
  const [positions, setPositions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // إنشاء المواضع العشوائية بعد تحميل العميل
  useEffect(() => {
    const randomPositions = [...Array(6)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    
    setPositions(randomPositions);
    setIsClient(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {isClient && positions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-brand-camel-200/30 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: position.duration,
              repeat: Infinity,
              delay: position.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center min-h-screen"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Side - Welcome Content */}
          <div className="space-y-8">
            <LoginHeader />
            <LoginFeatures />
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}