import { m } from 'framer-motion';
import Button from './components/ui/Button';
import Link from 'next/link';

const SlideContent = ({ slide, isActive, animationType }) => {
  const contentVariants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          ease: [0.34, 1.56, 0.64, 1],
          staggerChildren: 0.2
        }
      },
      exit: { 
        opacity: 0, 
        y: -30,
        transition: { duration: 0.4 }
      }
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.8, 
          ease: [0.34, 1.56, 0.64, 1],
          staggerChildren: 0.15
        }
      },
      exit: { 
        opacity: 0, 
        x: 80,
        transition: { duration: 0.4 }
      }
    },
    bounceIn: {
      hidden: { opacity: 0, scale: 0.3 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.9, 
          ease: [0.34, 1.56, 0.64, 1],
          staggerChildren: 0.1
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.3 }
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
    }
  };

  return (
    <m.div
      className="absolute inset-0 flex items-center justify-center z-10"
      variants={contentVariants[animationType]}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
    >
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <m.div variants={itemVariants}>
          <span className="inline-block px-4 py-2 bg-accent/20 backdrop-blur-soft text-accent font-body font-body-medium text-sm rounded-full mb-4 border border-accent/30">
            {slide?.category}
          </span>
        </m.div>
        
        <m.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-heading font-heading-bold text-shadow text-shadow-y-2 text-shadow-blur-9 text-shadow-md text-shadow-black/40 text-brand-darkGreen-900 mb-6 leading-tight"
        >
          {slide?.title}
        </m.h1>
        
        <m.p 
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-brand-sage-200 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {slide?.subtitle}
        </m.p>
        
        <m.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          
          <Link
            href="/boutique"
          >
            <Button
              variant="ghost"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="text-brand-greenBlack-600 border-brand-sage-300/30 hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg transition-spring hover:scale-105"
            >
              Voir la Collection
            </Button>
          </Link>
        </m.div>
      </div>
    </m.div>
  );
};

export default SlideContent;