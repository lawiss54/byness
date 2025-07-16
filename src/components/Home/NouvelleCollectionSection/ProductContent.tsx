
import { motion } from 'framer-motion';
import { Gift, Crown } from 'lucide-react';
import { ExclusiveProduct } from './types';
import { AddToCartButtons, BuyNowButtons } from '@/components/FashionShoppingButtons';
import Link from 'next/link';

interface ProductContentProps {
  product: ExclusiveProduct;
}

export default function ProductContent({ product }: ProductContentProps) {
  return (
    <Link href={`/produit/${product?.slug}`} className="flex-1 flex flex-col justify-between">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex-1 flex flex-col justify-between">
        {/* Header Section */}
        <div className="flex-shrink-0">
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-playfair font-bold text-brand-darkGreen-500 
                       mb-2 sm:mb-3 md:mb-4 line-clamp-2 leading-tight"
            whileHover={{ x: 8, color: "#da944a" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product?.name}
          </motion.h3>
        </div>

        {/* Spacer - يدفع السعر للأسفل */}
        <div className="flex-1"></div>

        {/* Premium Pricing Section - مثبت في الأسفل */}
        <div className="flex-shrink-0 mt-auto">
          <motion.div
            className="relative bg-gradient-to-r from-yellow-50 to-brand-camel-50 
                       p-3 sm:p-4 md:p-5 lg:p-6 
                       rounded-xl sm:rounded-2xl 
                       border-2 border-dashed border-yellow-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-darkGreen-500 
                               mb-1 truncate">
                  {product?.price.toLocaleString()} DA
                </div>
                <div className="text-xs sm:text-sm text-yellow-600 font-semibold">
                  Prix exclusif 
                </div>
              </div>
              <motion.div
                className="text-yellow-400/40 flex-shrink-0"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Crown size={24} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Link>
  );
}

