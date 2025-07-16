'use client';

import ReactPixel from 'react-facebook-pixel';

let isInitialized = false;

export const initFacebookPixel = (pixelId: string) => {
    if (typeof window !== 'undefined' && !isInitialized) {
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
        isInitialized = true;
    }
};

export const fbTrackEvent = (event: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        ReactPixel.track(event, data);
    }
};
