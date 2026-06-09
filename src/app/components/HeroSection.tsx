'use client'

import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Lazy loading للمكونات غير الأساسية
const SlideContent = dynamic(() => import('./HeroSection/SlideContent'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded" />,
  ssr: false
});

const DotNavigation = dynamic(() => import('./HeroSection/DotNavigation'), {
  loading: () => null,
  ssr: false
});

const SlideIndicator = dynamic(() => import('./HeroSection/SlideIndicator'), {
  loading: () => null,
  ssr: false
});

const ProgressBar = dynamic(() => import('./HeroSection/ProgressBar'), {
  loading: () => null,
  ssr: false
});

// مكون الصورة محسن
const OptimizedSlideImage = memo(({ slide, isActive, animationType }) => {
  const imageVariants = useMemo(() => ({
    enter: {
      opacity: 0,
      scale: animationType === 'zoom' ? 1.1 : 1,
      x: animationType === 'slide' ? 100 : 0,
    },
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: animationType === 'zoom' ? 0.9 : 1,
      x: animationType === 'slide' ? -100 : 0,
      transition: { duration: 0.5 }
    }
  }), [animationType]);

  // التحقق من وجود الشريحة والصورة
  if (!isActive || !slide || !slide.image) return null;

  return (
    <m.div
      className="absolute inset-0 z-0"
      variants={imageVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <Image
        src={slide.image}
        alt={slide.title || 'Hero slide'}
        fill
        className="object-cover"
        priority={true} 
        quality={100}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      <div className="absolute inset-0 bg-black/20" />
    </m.div>
  );
});

OptimizedSlideImage.displayName = 'OptimizedSlideImage';

// Hook مخصص لإدارة الـ autoplay
const useAutoPlay = (nextSlide, isAutoPlaying, isDragging) => {
  const intervalRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return stopAutoPlay;
  }, [isAutoPlaying, isDragging, startAutoPlay, stopAutoPlay]);

  return { startAutoPlay, stopAutoPlay };
};

// Hook للتعامل مع الـ touch/drag
const useDragHandler = (prevSlide, nextSlide, setIsAutoPlaying, setIsDragging) => {
  const [dragStartX, setDragStartX] = useState(0);

  const handleStart = useCallback((clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setIsAutoPlaying(false);
  }, [setIsDragging, setIsAutoPlaying]);

  const handleMove = useCallback((clientX) => {
    const deltaX = clientX - dragStartX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setIsDragging(false);
    }
  }, [dragStartX, prevSlide, nextSlide, setIsDragging]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  }, [setIsDragging, setIsAutoPlaying]);

  return {
    handleMouseDown: (e) => handleStart(e.clientX),
    handleMouseMove: (e) => handleMove(e.clientX),
    handleMouseUp: handleEnd,
    handleTouchStart: (e) => handleStart(e.touches[0].clientX),
    handleTouchMove: (e) => handleMove(e.touches[0].clientX),
    handleTouchEnd: handleEnd
  };
};

const HeroSection = memo(({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // Memoize slide functions
  const slideActions = useMemo(() => {
    if (!slides || slides.length === 0) return {};
    
    return {
    nextSlide: () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    prevSlide: () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    goToSlide: (index) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }}
  }, [slides.length, isTransitioning, currentSlide]);

  // Custom hooks
  useAutoPlay(slideActions.nextSlide, isAutoPlaying, isDragging);
  const dragHandlers = useDragHandler(
    slideActions.prevSlide,
    slideActions.nextSlide,
    setIsAutoPlaying,
    setIsDragging
  );

  // Memoize current slide data
  const currentSlideData = useMemo(() => 
    slides && slides.length > 0 ? slides[currentSlide] : null, 
    [slides, currentSlide]
  );

  // Memoize container variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }), []);

  // Preload next images - مع التحقق من وجود الصور
  useEffect(() => {
    if (typeof window === "undefined" || !slides || slides.length === 0) return;

    const nextIndex = (currentSlide + 1) % slides.length;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;

    [nextIndex, prevIndex].forEach(index => {
      const slide = slides[index];
      if (slide && slide.image && slide.image.trim() !== '') {
        // استخدام ReactDOM.preload بدلاً من إنشاء عنصر link يدوياً
        if (typeof window.ReactDOM !== 'undefined' && window.ReactDOM.preload) {
          window.ReactDOM.preload(slide.image, { as: 'image' });
        } else {
          // الطريقة التقليدية كـ fallback
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = slide.image;
          link.as = 'image';
          document.head.appendChild(link);
          
          // إزالة الرابط بعد فترة لتجنب تراكم العناصر
          setTimeout(() => {
            if (document.head.contains(link)) {
              document.head.removeChild(link);
            }
          }, 5000);
        }
      }
    });
  }, [currentSlide, slides]);

  // التحقق من وجود الشرائح بعد تعريف جميع الـ Hooks
  if (!slides || slides.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-background flex items-center justify-center">
        <p className="text-white text-xl">Aucune slide disponible actuellement</p>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-background cursor-grab active:cursor-grabbing"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseDown={dragHandlers.handleMouseDown}
        onMouseMove={isDragging ? dragHandlers.handleMouseMove : undefined}
        onMouseUp={dragHandlers.handleMouseUp}
        onMouseLeave={dragHandlers.handleMouseUp}
        onTouchStart={dragHandlers.handleTouchStart}
        onTouchMove={isDragging ? dragHandlers.handleTouchMove : undefined}
        onTouchEnd={dragHandlers.handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <React.Fragment key={currentSlideData?.order || currentSlide}>
            <OptimizedSlideImage
              slide={currentSlideData}
              isActive={true}
              animationType={currentSlideData?.animationType}
            />
            <SlideContent
              slide={currentSlideData}
              isActive={true}
              animationType={currentSlideData?.animationType}
            />
            <ProgressBar
              progress={0}
              isActive={isAutoPlaying}
              duration={5000}
            />
          </React.Fragment>
        </AnimatePresence>

        <DotNavigation
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={slideActions?.goToSlide}
        />

        <SlideIndicator
          currentSlide={currentSlide}
          totalSlides={slides?.length}
          isAutoPlaying={isAutoPlaying}
        />

        <m.button
          className="absolute top-6 left-6 z-20 w-12 h-12 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-black/40 hover:border-white/40 hover:scale-110"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          aria-label={isAutoPlaying ? "إيقاف التشغيل التلقائي" : "تشغيل التلقائي"}
        >
          <m.div
            animate={{ rotate: isAutoPlaying ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </m.div>
        </m.button>

        {/* Background decoration with reduced opacity for better performance */}
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </m.div>
    </LazyMotion>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;