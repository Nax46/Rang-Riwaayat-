import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { OrnateBorderHeader, DiyaIcon, MandalaIcon } from '../../../components/MotifDecoration';
import Link from 'next/link';
import { Heart, Compass, Shield, Users } from 'lucide-react';

export const metadata = {
  title: 'About Rang & Riwaayat — Celebrate Every Tradition',
  description: 'Our mission to preserve and celebrate India’s diverse festivals, cultures, and living heritage.',
};

export default function AboutPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 max-w-4xl">
      <OrnateBorderHeader
        title={dict.nav.about}
        subtitle="A digital sanctuary for discovering, preparing for, and celebrating India’s timeless traditions"
      />

      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial space-y-8 text-charcoal">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gold/20">
          <div className="w-20 h-20 rounded-full bg-vermilion flex items-center justify-center border-2 border-gold shrink-0">
            <DiyaIcon className="w-10 h-10 text-gold" flameColor="text-amber-300" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-charcoal">
              RANG & RIWAAYAT
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-gold mt-1">
              {dict.tagline}
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
              India’s premier multilingual digital destination for verified festival panchang, cultural arts, regional cooking lore, and communal celebration.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-vermilion">Our Vision</h3>
          <p className="text-sm leading-relaxed text-charcoal-muted">
            From the snow-clad Gompas of Ladakh to the palm-fringed backwaters of Kerala, from the vibrant Garba circles of Gujarat to the warrior log drums of Nagaland—India is an unparalleled mosaic of human devotion and celebration. Rang & Riwaayat was created to give this heritage an art-directed, verified, and interactive home where families, youth, travelers, and the global Indian diaspora can connect meaningfully with their roots.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-ivory-light p-5 rounded-2xl border border-gold/30 space-y-2">
            <Shield className="w-5 h-5 text-gold" />
            <h4 className="font-serif font-bold text-base text-charcoal">Scholarly Accuracy</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              We separate religious beliefs from verifiable historical timelines and reference national cultural institutions.
            </p>
          </div>
          <div className="bg-ivory-light p-5 rounded-2xl border border-gold/30 space-y-2">
            <Users className="w-5 h-5 text-gold" />
            <h4 className="font-serif font-bold text-base text-charcoal">Interactive Unity</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              From our live greeting card maker to multiplayer trivia games, we make cultural learning joyful and communal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

