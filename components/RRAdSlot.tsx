'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSlotProps {
  slotId: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
  label?: string;
}

export function RRAdSlot({
  slotId,
  format = 'horizontal',
  className = '',
  label = 'Advertisement',
}: AdSlotProps) {
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const pushedRef = useRef(false);

  // CLS Prevention: Reserve strict container minimum heights
  const formatClasses =
    format === 'horizontal'
      ? 'min-h-[100px] sm:min-h-[120px] max-w-4xl'
      : format === 'rectangle'
      ? 'min-h-[280px] max-w-[336px]'
      : 'min-h-[130px] max-w-2xl';

  useEffect(() => {
    if (!adsEnabled || !clientId || pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      // Gracefully catch any AdSense script initialization errors
      console.warn('[Google AdSense] Push error caught safely:', err);
    }
  }, [adsEnabled, clientId]);

  // If ads are disabled or not configured, return null to avoid blank spaces
  if (!adsEnabled || !clientId) {
    return null;
  }

  const formattedClientId = clientId.startsWith('ca-') ? clientId : `ca-${clientId}`;

  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 mx-auto w-full px-2 py-3 rounded-2xl bg-ivory/60 border border-gold/30 text-center transition-all overflow-hidden ${formatClasses} ${className}`}
    >
      {/* Google Policy Mandated Label */}
      <div className="text-[10px] uppercase tracking-widest text-charcoal-muted font-bold mb-2 select-none flex items-center justify-center space-x-1.5 opacity-75">
        <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
        <span>{label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
      </div>

      {/* Official Google AdSense Ins Element */}
      <div className="flex items-center justify-center overflow-hidden">
        <ins
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={formattedClientId}
          data-ad-slot={slotId}
          data-ad-format={format === 'horizontal' ? 'horizontal' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
