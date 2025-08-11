import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { floatingElementsConfig } from './animations';

// Simple seeded random number generator
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingElements() {
  // Generate stable random values that will be the same on server and client
  const elements = useMemo(() => {
    return [...Array(floatingElementsConfig.count)].map((_, i) => ({
      id: i,
      left: seededRandom(i * 1000) * 100,
      top: seededRandom(i * 1000 + 1) * 100,
      duration: floatingElementsConfig.transition.baseDuration + 
                seededRandom(i * 1000 + 2) * floatingElementsConfig.transition.randomRange,
      delay: seededRandom(i * 1000 + 3) * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0">
      {elements.map((element) => (
       

          <motion.div
            key={element?.id}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{
              left: `${element?.left}%`,
              top: `${element?.top}%`,
            }}
            animate={floatingElementsConfig?.animate}
            transition={{
              duration: element?.duration,
              repeat: Infinity,
              delay: element?.delay,
            }}
          />
       
      ))}
    </div>
  );
}