import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { CelebrationStudioCardMaker } from '../../../components/CelebrationStudioCardMaker';
import { FESTIVAL_WISHES_DATA } from '../../../lib/data/verified-seeds';
import { OrnateBorderHeader, DiyaIcon } from '../../../components/MotifDecoration';
import { Palette, MessageCircle, Share2, Sparkles, Check } from 'lucide-react';

export const metadata = {
  title: 'Celebration Studio & High-Resolution Greeting Card Maker',
  description: 'Design and download personalized greeting cards, festive wishes, and WhatsApp status ideas locally.',
};

export default function StudioPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { festival?: string };
}) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <OrnateBorderHeader
        title={dict.studio.title}
        subtitle={dict.studio.subtitle}
      />

      {/* Main Interactive Card Maker Component */}
      <CelebrationStudioCardMaker locale={loc} initialFestivalSlug={searchParams.festival || 'diwali'} />

      {/* Curated Festive Wishes & WhatsApp Status Ideas */}
      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial space-y-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-gold" />
          <h3 className="font-serif text-2xl font-bold text-charcoal">
            Curated Festive Blessings & WhatsApp Status Messages
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FESTIVAL_WISHES_DATA.map((item, idx) => (
            <div
              key={idx}
              className="bg-ivory-light p-5 rounded-2xl border border-gold/30 space-y-3 shadow-xs"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-vermilion">
                {item.title[loc]}
              </div>
              <div className="space-y-3">
                {item.captions.map((cap, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 bg-ivory-surface rounded-xl border border-gold/20 text-xs text-charcoal leading-relaxed"
                  >
                    "{cap[loc]}"
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

