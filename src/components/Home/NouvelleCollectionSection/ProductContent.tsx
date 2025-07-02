
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
    <>
      <Link href={`/produit/${product?.slug}`} className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <motion.h3
            className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-4 line-clamp-2"
            whileHover={{ x: 8, color: "#da944a" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product?.name}
          </motion.h3>

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
                  {product?.price.toLocaleString()} DA
                </div>
                <div className="text-sm text-yellow-600 font-semibold">
                  Prix exclusif 
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

        </div>
      </Link>
    </>
  );
}