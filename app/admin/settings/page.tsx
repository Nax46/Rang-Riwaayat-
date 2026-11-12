import React from 'react';
import { getAdminSession } from '../../../lib/auth/jwt';
import { redirect } from 'next/navigation';
import { Settings, Shield, DollarSign } from 'lucide-react';

export default async function AdminSettingsPage() {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'Not configured';
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'Not configured';

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal">
          Platform Governance & Monetization Settings
        </h1>
        <p className="text-xs text-charcoal-muted mt-1">
          Configure advertising parameters, analytics integration, and system flags.
        </p>
      </div>

      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-xs space-y-6">
        <div className="border-b border-gold/20 pb-4">
          <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gold" />
            <span>Google AdSense Monetization Readiness (Part 11)</span>
          </h3>
          <p className="text-xs text-charcoal-muted mt-1">
            In compliance with Part 11 of the master instructions, advertising remains strictly disabled until official Google AdSense publisher validation is complete.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-light border border-gold/30">
            <div>
              <div className="font-bold text-charcoal">AdSense Delivery State</div>
              <div className="text-charcoal-muted">Controls whether RRAdSlot components render ads</div>
            </div>
            <span className={`px-3 py-1 rounded-full font-bold ${
              adsEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-charcoal/10 text-charcoal-muted'
            }`}>
              {adsEnabled ? 'Active' : 'Disabled (Safe Mode)'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-light border border-gold/30">
            <div>
              <div className="font-bold text-charcoal">AdSense Publisher Client ID</div>
              <div className="text-charcoal-muted font-mono">{clientId}</div>
            </div>
            <span className="text-charcoal-soft italic">Managed via env</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-light border border-gold/30">
            <div>
              <div className="font-bold text-charcoal">Google Analytics 4 Property</div>
              <div className="text-charcoal-muted font-mono">{ga4Id}</div>
            </div>
            <span className="text-charcoal-soft italic">Managed via env</span>
          </div>
        </div>
      </div>
    </div>
  );
}

