import Image from 'next/image';
import { memo, useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = "",
  onLoad 
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <>
      <Image
        width={1080}
        height={1080}
        src={src}
        alt={alt}
        className={`${className} transition-all duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        loading="lazy"
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-ivory-100 to-brand-ivory-200 animate-pulse" />
      )}
    </>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
