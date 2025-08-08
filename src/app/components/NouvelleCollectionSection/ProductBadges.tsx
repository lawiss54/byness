
import { motion } from 'framer-motion';
import { Crown, Zap } from 'lucide-react';

interface ProductBadgesProps {
  badge: string;
  index: number;
}

export default function ProductBadges({ badge, index }: ProductBadgesProps) {
  return (
    <div className="absolute top-6 left-6 flex flex-col gap-3">
      {badge && (
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.2 + 1, type: "spring" }}
        >
          <Crown className="w-4 h-4" />
          {badge}
        </motion.div>
      )}
      
      
      <motion.div
        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="w-3 h-3" />
        Quantité limitée
      </motion.div>
    </div>
  );
}