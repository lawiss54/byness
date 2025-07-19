'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { initFacebookPixel } from '@/lib/facebookPixel.client';
import { initTiktokPixel } from '@/lib/tiktokPixel.client';

interface TrackingScriptsProps {
    settings?: {
        facebookPixel?: string | null;
        tiktokPixel?: string | null;
        googleAnalytics?: string | null;
        googleAds?: string | null;
        snapchatPixel?: string | null;
    };
}

const TrackingScriptHelper = ({ settings }: TrackingScriptsProps) => {
    useEffect(() => {
        if (settings?.facebookPixel) {
            initFacebookPixel(settings.facebookPixel);
        }
        if (settings?.tiktokPixel) {
            initTiktokPixel(settings.tiktokPixel);
        }
    }, [settings?.facebookPixel, settings?.tiktokPixel]);

    return (
        <>
           
            {/* Google Analytics */}
            {settings?.googleAnalytics && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.googleAnalytics}');
            `}
                    </Script>
                </>
            )}

            {/* Google Ads */}
            {settings?.googleAds && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAds}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-ads" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.googleAds}');
            `}
                    </Script>
                </>
            )}

            {/* Snapchat Pixel */}
            {settings?.snapchatPixel && (
                <Script id="snapchat-pixel" strategy="afterInteractive">
                    {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'snapPixelStart': new Date().getTime(), event:'snapPixelInit'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);j.async=true;
              j.src='https://sc-static.net/scevent.min.js';
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','snaptr');

            snaptr('init', '${settings.snapchatPixel}');
            snaptr('track', 'PAGE_VIEW');
          `}
                </Script>
            )}
        </>
    );
};

export default TrackingScriptHelper;
