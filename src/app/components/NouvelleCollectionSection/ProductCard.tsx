'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '../../boutique/types';
import ProductBadges from './ProductBadges'
import ProductContent from './ProductContent'

interface ProductCardProps {
  product: Product;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function ProductCard({
  product,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd
}: ProductCardProps) {
  return (
    <motion.div
      className="group relative w-full"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* Premium Card */}
      <motion.div
        className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden 
                   min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] 
                   flex flex-col w-full"
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
          boxShadow: isHovered
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
          <div className="relative w-full 
                         h-72 xs:h-80 sm:h-96 md:h-[28rem] lg:h-[30rem] xl:h-[32rem] 
                         overflow-hidden rounded-t-3xl flex-shrink-0 group">
            {/* الخلفية المتدرجة المتحركة */}
            <motion.div
              className="absolute inset-0 z-0 bg-gradient-to-br from-yellow-100 via-brand-camel-100 to-yellow-200"
              animate={{
                background: isHovered
                  ? "linear-gradient(to bottom right, #fef3c7, #f4e0c2, #fde68a)"
                  : "linear-gradient(to bottom right, #fef3c7, #faf1e1, #fde68a)",
              }}
              transition={{ duration: 0.6 }}
            />

            {/* صورة المنتج */}
            <Image
              src={product?.images[0]}
              alt={product?.name}
              fill
              className="object-fill object-center w-full h-full transition-transform duration-700 group-hover:scale-105 z-10
                [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]
                [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* بادجات المنتج */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
              <ProductBadges badge={product?.badge} index={index} />
            </div>
          </div>

          {/* Content Section - يأخذ المساحة المتبقية */}
          <div className="flex-1 flex flex-col min-h-0 px-3 py-2 sm:px-4 sm:py-4 text-sm sm:text-base">
            <ProductContent product={product} />
          </div>
        </div>

        {/* Premium Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-brand-camel-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          animate={isHovered ? {
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
  );
}
