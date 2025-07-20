
'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

export default function GoogleAnalyticsClient({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
