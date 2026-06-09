
import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';

interface ProductStatsProps {
  rating: number;
  reviews: number;
  isHovered: boolean;
}

export default function ProductStats({ rating, reviews, isHovered }: ProductStatsProps) {
  return (
    <motion.div
      className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        y: isHovered ? 0 : 20,
      }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <span className="text-sm font-bold text-brand-darkGreen-600">
          {rating}
        </span>
        <span className="text-xs text-brand-darkGreen-400">
          ({reviews})
        </span>
      </div>

      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
        <Users className="w-4 h-4 text-brand-camel-500" />
        <span className="text-xs text-brand-darkGreen-600 font-semibold">
          VIP Exclusive
        </span>
      </div>
    </motion.div>
  );
}