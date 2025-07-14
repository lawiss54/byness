'use client';

import { useCallback } from 'react';
import { fbTrackEvent } from '@/lib/facebookPixel';

/**
 * Hook لاستدعاء أحداث Facebook Pixel بسهولة
 */
export const useFacebookPixelEvent = () => {
  const track = useCallback(
    (event: string, data?: Record<string, any>) => {
      fbTrackEvent(event, data);
    },
    []
  );

  return { track };
};
