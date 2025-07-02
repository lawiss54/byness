import { m } from 'framer-motion';

const DotNavigation = ({ slides, currentSlide, onSlideChange }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    }
  };

  return (
    <m.div
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-soft px-4 py-3 rounded-full border border-white/20">
        {slides.map((_, index) => (
          <m.button
            key={index}
            variants={dotVariants}
            onClick={() => onSlideChange(index)}
            className={`relative transition-spring hover:scale-125 ${
              currentSlide === index
                ? 'w-8 h-3' :'w-3 h-3 hover:w-4'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <m.div
              className={`w-full h-full rounded-full transition-spring ${
                currentSlide === index
                  ? 'bg-accent shadow-glow'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              layoutId={currentSlide === index ? "activeDot" : undefined}
            />
            
            {currentSlide === index && (
              <m.div
                className="absolute inset-0 rounded-full bg-accent animate-shimmer"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </m.button>
        ))}
      </div>
    </m.div>
  );
};

export default DotNavigation;