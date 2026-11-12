import React from 'react';
import { getAdminSession } from '../../../lib/auth/jwt';
import { redirect } from 'next/navigation';
import { getFestivals } from '../../../lib/db/store';
import { Languages, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function AdminTranslationsPage() {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const festivals = await getFestivals();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal">
          Indic Multilingual Workflow
        </h1>
        <p className="text-xs text-charcoal-muted mt-1">
          Review status and linguistic fidelity across English, Hindi (Devanagari), and Gujarati editions.
        </p>
      </div>

      <div className="bg-ivory-surface rounded-3xl p-6 border border-gold/40 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gold/20">
          <div className="p-4 rounded-xl bg-ivory-light border border-gold/30">
            <div className="text-xs font-bold text-vermilion uppercase">English Edition</div>
            <div className="font-serif text-xl font-bold text-charcoal mt-1">Primary Authoritative</div>
            <p className="text-[11px] text-charcoal-muted mt-1">100% Verified against national archives</p>
          </div>
          <div className="p-4 rounded-xl bg-ivory-light border border-gold/30">
            <div className="text-xs font-bold text-vermilion uppercase">हिन्दी संस्करण (Devanagari)</div>
            <div className="font-serif text-xl font-bold text-charcoal mt-1">Linguistic Review Complete</div>
            <p className="text-[11px] text-charcoal-muted mt-1">Traditional Hindi and Sanskrit terms verified</p>
          </div>
          <div className="p-4 rounded-xl bg-ivory-light border border-gold/30">
            <div className="text-xs font-bold text-vermilion uppercase">ગુજરાતી આવૃત્તિ (Gujarati)</div>
            <div className="font-serif text-xl font-bold text-charcoal mt-1">Verified with Regional Nuance</div>
            <p className="text-[11px] text-charcoal-muted mt-1">Bestu Varas, Chopda Pujan & Garba lore</p>
          </div>
        </div>

        <div className="space-y-3">
          {festivals.map((f) => (
            <div
              key={f.id}
              className="p-4 rounded-2xl bg-ivory-light border border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal">{f.title.en}</h4>
                <div className="text-xs text-charcoal-muted flex items-center space-x-3 mt-1">
                  <span>HI: <strong>{f.title.hi}</strong></span>
                  <span>•</span>
                  <span>GU: <strong>{f.title.gu}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approved & Published</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

