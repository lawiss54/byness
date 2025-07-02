import { m } from 'framer-motion';
import Icon from './components/AppIcon';

const NavigationArrows = ({ onPrevious, onNext, canNavigate = true }) => {
  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.8 }
    }
  };

  const ArrowButton = ({ direction, onClick, icon }) => (
    <m.button
      variants={arrowVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      disabled={!canNavigate}
      className={`absolute top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 lg:w-16 lg:h-16 bg-black/20 backdrop-blur-soft border border-white/20 rounded-full flex items-center justify-center text-white transition-spring hover:bg-black/40 hover:border-white/40 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
        direction === 'left' ? 'left-4 lg:left-8' : 'right-4 lg:right-8'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon name={icon} size={20} className="lg:w-6 lg:h-6" />
      
      <m.div
        className="absolute inset-0 rounded-full bg-accent/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: 1, 
          opacity: 1,
          transition: { duration: 0.2 }
        }}
      />
    </m.button>
  );

  return (
    <>
      <ArrowButton
        direction="left"
        onClick={onPrevious}
        icon="ChevronLeft"
      />
      <ArrowButton
        direction="right"
        onClick={onNext}
        icon="ChevronRight"
      />
    </>
  );
};

export default NavigationArrows;