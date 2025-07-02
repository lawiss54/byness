
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExclusiveProduct } from './types';
import ProductBadges from './ProductBadges'
import ProductStats from './ProductStats'
import ProductContent from './ProductContent'


interface ProductCardProps {
  product: ExclusiveProduct;
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
      className="group relative"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
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
          <div className="h-[450px] relative overflow-hidden rounded-t-3xl flex-shrink-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-brand-camel-100 to-yellow-200"
              animate={{
                background: isHovered
                  ? "linear-gradient(to bottom right, #fef3c7, #f4e0c2, #fde68a)"
                  : "linear-gradient(to bottom right, #fef3c7, #faf1e1, #fde68a)",
              }}
              transition={{ duration: 0.6 }}
            />
            
            <Image
              src={product?.images[0]}
              alt={product?.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <ProductBadges badge={product?.badge} index={index} />
            
            <ProductStats 
              rating={product?.rating} 
              reviews={product?.reviews} 
              isHovered={isHovered} 
            />
          </div>

          <ProductContent product={product} />
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