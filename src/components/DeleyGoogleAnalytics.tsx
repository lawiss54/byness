'use client'

import dynamic from 'next/dynamic';

const GoogleAnalyticsClient = dynamic(() => import('@/components/GoogleAnalyticsClient'), {
  ssr: false,
});

export default function DeleyGoogleAnalytics({ gaId }: { gaId: string }){
    return <GoogleAnalyticsClient gaId={gaId} />
}