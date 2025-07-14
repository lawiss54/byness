import ReactPixel from 'react-facebook-pixel';

let isInitialized = false;

export const initFacebookPixel = (pixelId: string) => {
    if (!isInitialized) {
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
        isInitialized = true;
    }
};

export const fbTrackEvent = (event: string, data?: Record<string, any>) => {
    ReactPixel.track(event, data);
};
