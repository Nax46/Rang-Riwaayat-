'use client';

import Script from 'next/script';

export function GoogleAdSense() {
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Only inject the live Google AdSense script when ads are explicitly enabled and a client ID is configured
  if (!adsEnabled || !clientId) {
    return null;
  }

  // Format client ID cleanly (ensure ca-pub- prefix)
  const formattedClientId = clientId.startsWith('ca-') ? clientId : `ca-${clientId}`;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${formattedClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

