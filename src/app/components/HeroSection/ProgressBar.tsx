import { m } from 'framer-motion';

const ProgressBar = ({ progress, isActive, duration = 5000 }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
      <m.div
        className="h-full bg-gradient-to-r from-accent to-accent/80 shadow-glow"
        initial={{ width: "0%" }}
        animate={{ 
          width: isActive ? "100%" : "0%"
        }}
        transition={{ 
          duration: duration / 1000,
          ease: "linear"
        }}
        key={`progress-${isActive}`}
      />
    </div>
  );
};

export default ProgressBar;