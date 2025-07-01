import React, { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductTabsProps } from './type';



const ProductTabs = memo<ProductTabsProps>( ({
  product,
  activeTab,
  onTabChange
}) => {
  // Memoized tabs configuration to prevent recreation on every render
  const tabs = useMemo(() => [
    { id: 'description', label: 'Description', icon: '📋' },
  ], []);

  // Animation variants for tab content
  const tabContentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
              Description détaillée
            </h3>
            <div className="text-brand-darkGreen-400 leading-relaxed space-y-4">
              {product?.longDescription.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        );
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
              Conseils d&apos;entretien
            </h3>
            
            <div className="bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 p-6 rounded-2xl">
              <p className="text-brand-darkGreen-400 mb-6 text-lg leading-relaxed">
                {product?.care}
              </p>
            </div>
            
            <div className="bg-white border-2 border-dashed border-brand-camel-200 p-6 rounded-2xl">
              <h4 className="font-semibold text-brand-darkGreen-500 mb-4 text-lg">
                  💡 Pour préserver la qualité de votre produit:&apos;
                </h4>
              <ul className="grid sm:grid-cols-2 gap-3 text-brand-darkGreen-400">
                {[
                  'Évitez l&apos;exposition prolongée au soleil',
                  'Stockez dans un endroit sec et aéré',
                  'Suivez scrupuleusement les instructions de lavage',
                  'Repassez à température modérée si nécessaire',
                  'Utilisez des produits d&apos;entretien adaptés',
                  'Évitez les produits chimiques agressifs'
                ].map((tip, index) => (
                  <motion.li
                    key={tip}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-brand-camel-500 font-bold">•</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-3xl p-8">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab?.id
                ? 'bg-brand-camel-500 text-white shadow-lg scale-105'
                : 'bg-white text-brand-darkGreen-500 hover:bg-brand-camel-50 hover:scale-102'
            }`}
            whileHover={{ scale: activeTab === tab?.id ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={activeTab === tab?.id}
            aria-label={`Afficher l&apos;onglet ${tab?.label}`}
          >
            <span className="text-lg">{tab?.icon}</span>
            <span>{tab?.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <div className="bg-white rounded-2xl p-8 shadow-lg min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

ProductTabs.displayName = 'ProductTabs';

export default ProductTabs;