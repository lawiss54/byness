import { m } from 'framer-motion';

const SlideIndicator = ({ currentSlide, totalSlides, isAutoPlaying }) => {
  const indicatorVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 1 }
    }
  };

  return (
    <m.div
      className="absolute top-6 right-6 z-20"
      variants={indicatorVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-black/20 backdrop-blur-soft px-4 py-2 rounded-full border border-white/20 flex items-center space-x-3">
        <div className="text-white font-mono text-sm">
          <span className="text-accent font-body-medium">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/60 mx-1">/</span>
          <span className="text-white/80">
            {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
        
        {isAutoPlaying && (
          <m.div
            className="w-2 h-2 bg-accent rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </m.div>
  );
};

export default SlideIndicator;