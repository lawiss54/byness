'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseLoaderOptions {
  minDuration?: number; // Minimum loading duration in ms
  autoHide?: boolean;   // Auto hide after completion
  onComplete?: () => void;
}

export const useLoader = (options: UseLoaderOptions = {}) => {
  const { minDuration = 1000, autoHide = true, onComplete } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
    setStartTime(Date.now());
  }, []);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)));
  }, []);

  const stopLoading = useCallback(() => {
    const now = Date.now();
    const elapsed = startTime ? now - startTime : 0;
    const remaining = Math.max(0, minDuration - elapsed);

    if (remaining > 0) {
      setTimeout(() => {
        setProgress(100);
        if (autoHide) {
          setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
          }, 500);
        } else {
          onComplete?.();
        }
      }, remaining);
    } else {
      setProgress(100);
      if (autoHide) {
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 500);
      } else {
        onComplete?.();
      }
    }
  }, [startTime, minDuration, autoHide, onComplete]);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setStartTime(null);
  }, []);

  return {
    isLoading,
    progress,
    startLoading,
    updateProgress,
    stopLoading,
    hideLoader
  };
};

// Hook for simulating loading with automatic progress
export const useSimulatedLoader = (duration: number = 3000) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startSimulation = useCallback(() => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  return {
    isLoading,
    progress,
    startSimulation
  };
};