import { motion } from 'framer-motion';
import Image from 'next/image';


const SlideImage = ({ slide, isActive, animationType }) => {
  const imageVariants = {
    fadeInUp: {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }
      },
      exit: { 
        opacity: 0, 
        scale: 0.95,
        transition: { duration: 0.5 }
      }
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -100, scale: 1.05 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }
      },
      exit: { 
        opacity: 0, 
        x: 100, 
        scale: 0.95,
        transition: { duration: 0.5 }
      }
    },
    bounceIn: {
      hidden: { opacity: 0, scale: 0.8, rotate: -5 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: { 
          duration: 1.1, 
          ease: [0.34, 1.56, 0.64, 1],
          rotate: { duration: 0.8 }
        }
      },
      exit: { 
        opacity: 0, 
        scale: 1.1, 
        rotate: 3,
        transition: { duration: 0.4 }
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      variants={imageVariants[animationType]}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
    >
      <Image
        src={slide?.image}
        alt={slide?.title}
        width={1080}
        height={1080}
        className="w-full h-full object-cover"
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"
        variants={overlayVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        exit="exit"
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        variants={overlayVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        exit="exit"
      />
    </motion.div>
  );
};

export default SlideImage;