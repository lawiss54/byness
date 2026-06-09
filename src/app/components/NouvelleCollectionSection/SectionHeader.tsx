
import { motion } from 'framer-motion';
import { Crown, Sparkles, Timer } from 'lucide-react';

interface SectionHeaderProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

export default function SectionHeader({ timeLeft, formatTime }: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Premium Badge */}
      <motion.div
        className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl mb-8"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Crown className="w-6 h-6 text-yellow-500" />
        </motion.div>
        <span className="text-brand-darkGreen-600 font-bold text-lg">
          Collection Exclusive
        </span>
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-brand-camel-500" />
        </motion.div>
      </motion.div>

      <motion.h2
        className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Édition
        <motion.span
          className="block text-yellow-400"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Limitée
        </motion.span>
      </motion.h2>

      <motion.p
        className="text-xl text-white/90 font-secondary max-w-3xl mx-auto mb-8"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Des pièces uniques et exclusives, créées en quantité limitée pour les connaisseurs d&apos;exception
      </motion.p>

      {/* Countdown Timer */}
      <motion.div
        className="inline-flex items-center gap-4 bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-2xl shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(239, 68, 68, 0.5)",
            "0 0 40px rgba(239, 68, 68, 0.8)",
            "0 0 20px rgba(239, 68, 68, 0.5)"
          ]
        }}
      >
        <Timer className="w-5 h-5" />
        <span className="font-semibold">Offre se termine dans:</span>
        <motion.span 
          className="font-mono text-xl font-bold"
          animate={{ scale: timeLeft % 60 === 0 ? [1, 1.1, 1] : 1 }}
        >
          {formatTime(timeLeft)}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}