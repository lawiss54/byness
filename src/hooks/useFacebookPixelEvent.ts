'use client';

import { useCallback } from 'react';
import { fbTrackEvent } from '@/lib/facebookPixel.client';

export const useFacebookPixelEvent = () => {
  const track = useCallback(
    (event: string, data?: Record<string, any>) => {
      fbTrackEvent(event, data);
    },
    []
  );

  return { track };
};
