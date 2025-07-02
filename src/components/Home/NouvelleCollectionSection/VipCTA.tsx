
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';


export default function VipCTA() {
  return (
    <motion.div
      className="text-center mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 }}
    >
      <motion.div
        className="inline-flex flex-col items-center gap-6 bg-white/90 backdrop-blur-sm px-12 py-8 rounded-3xl shadow-2xl"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
            Accès VIP Exclusif
          </h3>
          <p className="text-brand-darkGreen-400 mb-6">
            Rejoignez notre Boutique VIP pour accéder en priorité aux nouvelles collections exclusives
          </p>
        </div>
        <Link href="/boutique">
          <motion.button
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-brand-camel-500 hover:from-yellow-500 hover:to-brand-camel-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Crown className="w-5 h-5" />
            <span>Accès à la boutique VIP</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </Link> 
      </motion.div>
    </motion.div>
  );
}