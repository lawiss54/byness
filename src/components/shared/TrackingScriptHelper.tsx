'use client';

import { useEffect } from 'react';
import { initFacebookPixel } from '@/lib/facebookPixel.client';
import { initTiktokPixel } from '@/lib/tiktokPixel.client';
import { usePathname } from "next/navigation";





interface TrackingScriptsProps {
    settings?: {
        facebookPixel?: string | null;
        tiktokPixel?: string | null;
        googleAnalytics?: string | null;
        snapchatPixel?: string | null;
    };
}

const TrackingScriptHelper = ({ settings }: TrackingScriptsProps) => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (settings?.facebookPixel) {
            initFacebookPixel(settings.facebookPixel);
        }
        if (settings?.tiktokPixel) {
            initTiktokPixel(settings.tiktokPixel);
        }
      }
        
        
    }, [settings?.facebookPixel, settings?.tiktokPixel]);

    return null
};

export default TrackingScriptHelper;
