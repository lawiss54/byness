'use client';

let isInitialized = false;
let reactPixel: any = null;

export const initFacebookPixel = async (pixelId: string) => {
  if (typeof window === 'undefined') return; // don't run on server
  if (isInitialized) return;

  const mod = await import('react-facebook-pixel');
  reactPixel = mod?.default ?? mod; // <-- important!
  if (!reactPixel) return;

  reactPixel.init(pixelId);
  reactPixel.pageView();
  isInitialized = true;
};

export const fbTrackEvent = async (event: string, data?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  if (!reactPixel) {
    const mod = await import('react-facebook-pixel');
    reactPixel = mod?.default ?? mod;
  }
  if (!reactPixel) return;
  reactPixel.track(event, data);
};