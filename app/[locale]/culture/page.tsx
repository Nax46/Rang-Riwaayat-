import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { getAllStatesUTs } from '../../../lib/db/store';
import { OrnateBorderHeader, MandalaIcon } from '../../../components/MotifDecoration';
import Link from 'next/link';
import { Music, Palette, BookOpen, MapPin, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Culture & Traditions of Bharat',
  description: 'Explore the folk arts, classical music, textiles, and sacred crafts across India.',
};

export default async function CulturePage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);
  const states = await getAllStatesUTs();

  // Aggregate folk arts from all states
  const allArts = states.flatMap((s) =>
    s.traditionalFolkArts.map((art) => ({
      ...art,
      stateName: s.name[loc],
      stateCode: s.code,
      region: s.region,
    }))
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <OrnateBorderHeader
        title={dict.nav.culture}
        subtitle={
          loc === 'hi'
            ? 'लोककला, शास्त्रीय नृत्य, पैतृक हथकरघा और पीढ़ियों से संजोई गई पावन शिल्प परंपराएं'
            : loc === 'gu'
            ? 'લોકકળા, શાસ્ત્રીય નૃત્ય, પેઢીઓ જૂના હાથવણાટ અને કલાત્મક વારસાની અનોખી ધરોહર'
            : 'Sacred dance traditions, heirloom handlooms woven with centuries of memory, tribal metalcraft, and living architecture passed gently through generations.'
        }
      />

      {/* Pillars of Indian Culture Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Folk & Classical Dance', icon: Sparkles, desc: 'From Kathakali and Garba to Manipuri Raas and Cheraw bamboo dance' },
          { title: 'Sacred Textile Artistry', icon: Palette, desc: 'Patan Patola, Banarasi Brocades, Kanchipuram Korvai, and Phulkari' },
          { title: 'Tribal Traditions', icon: Music, desc: 'Bastar Dhokra casting, Warli and Gond murals, and indigenous 100-Drums' },
          { title: 'Temple & Living Architecture', icon: BookOpen, desc: 'Konark wheel geometry, Thanjavur granite vimanas, and Living Root bridges' },
        ].map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-ivory-surface p-6 rounded-3xl border border-gold/40 shadow-xs space-y-2 hover:shadow-editorial transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-vermilion/10 text-vermilion flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal">{pillar.title}</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Folk Arts Directory */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-charcoal flex items-center space-x-2">
          <MandalaIcon className="w-5 h-5 text-gold" />
          <span>Regional Arts, Crafts & Classical Dances</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArts.map((art, idx) => (
            <div
              key={idx}
              className="bg-ivory-surface rounded-2xl border border-gold/30 p-5 space-y-3 shadow-xs hover:border-gold transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-vermilion bg-gold/20 px-2.5 py-0.5 rounded-md">
                  {art.type}
                </span>
                <span className="text-xs text-charcoal-muted font-mono">
                  {art.stateName} ({art.region})
                </span>
              </div>

              <h4 className="font-serif font-bold text-xl text-charcoal">{art.name}</h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">{art.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

