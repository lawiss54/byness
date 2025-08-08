import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw } from 'lucide-react';

/**
 * TrustSignals Component
 * Displays trust-building elements like delivery, guarantee, and return policies
 * 
 * Performance optimizations:
 * - Memoized component to prevent unnecessary re-renders
 * - Static data to avoid prop drilling
 * - Optimized animations with staggered entrance
 */
const TrustSignals = memo(() => {
  // Trust signals data - static data kept in component to avoid prop drilling
  const trustItems = [
    { 
      icon: Truck, 
      text: 'Livraison rapide', 
      subtext: 'Livraison rapide dans toutes les wilayas',
      color: 'text-brand-camel-500'
    },
    { 
      icon: Shield, 
      text: 'Qualité des produits', 
      subtext: 'Des vêtements pour femmes modernes et soigneusement sélectionnés',
      color: 'text-green-500'
    },
    { 
      icon: RotateCcw, 
      text: 'Retour facile', 
      subtext: 'sans frais',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="pt-6 border-t border-brand-sage-200 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        {trustItems.map((item, index) => (
          <motion.div
            key={item.text}
            className="text-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.8 + index * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              y: -2, 
              transition: { duration: 0.2 }
            }}
          >
            <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
            <p className="text-sm font-semibold text-brand-darkGreen-500 mb-1">
              {item.text}
            </p>
            <p className="text-xs text-brand-darkGreen-400">
              {item.subtext}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

TrustSignals.displayName = 'TrustSignals';

export default TrustSignals;