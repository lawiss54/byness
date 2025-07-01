import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export const EmptyState = memo(() => (
  <motion.div
    className="text-center py-20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-20 h-20 bg-brand-ivory-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <ShoppingBag className="w-8 h-8 text-brand-camel-500" />
    </div>
    <h3 className="text-xl font-medium text-brand-darkGreen-600 mb-2">
      لا توجد منتجات
    </h3>
    <p className="text-brand-darkGreen-400">
      لم نجد أي منتجات تطابق المعايير المحددة
    </p>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';
