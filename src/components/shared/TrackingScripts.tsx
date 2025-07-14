'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { initFacebookPixel } from '@/lib/facebookPixel';

interface TrackingScriptsProps {
    settings?: {
        facebookPixel?: string | null;
        tiktokPixel?: string | null;
        googleAnalytics?: string | null;
        googleAds?: string | null;
        snapchatPixel?: string | null;
    };
}

const TrackingScripts = ({ settings }: TrackingScriptsProps) => {
    useEffect(() => {
        if (settings?.facebookPixel) {
            initFacebookPixel(settings.facebookPixel);
        }
    }, [settings?.facebookPixel]);

    return (
        <>
            {/* TikTok Pixel */}
            {settings?.tiktokPixel && (
                <Script id="tiktok-pixel" strategy="afterInteractive">
                    {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
              ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                }
              };
              for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(ttq, ttq.methods[i])
              }
              ttq.instance = function (t) {
                var e = ttq._i[t] || [];
                for (var n = 0; n < ttq.methods.length; n++) {
                  ttq.setAndDefer(e, ttq.methods[n])
                }
                return e
              };
              ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = i;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date;
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript";
                o.async = !0;
                o.src = i;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a)
              };

              ttq.load('${settings.tiktokPixel}');
              ttq.page();
            }(window, document, 'ttq');
          `}
                </Script>
            )}

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

export default TrackingScripts;
