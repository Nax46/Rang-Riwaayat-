'use client';

import React, { useState, useEffect } from 'react';
import { StateUTData, Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import Link from 'next/link';
import { MapPin, Award, Sparkles, Utensils, Music, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MandalaIcon } from './MotifDecoration';

interface StateExplorerProps {
  states: StateUTData[];
  locale: Locale;
}

export function IndiaStateExplorer({ states, locale }: StateExplorerProps) {
  const dict = getDictionary(locale);
  const [selectedState, setSelectedState] = useState<StateUTData>(states[0] || {} as StateUTData);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [collectedBadges, setCollectedBadges] = useState<string[]>([]);
  const [stampFeedback, setStampFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rr_culture_passport');
      if (stored) {
        setCollectedBadges(JSON.parse(stored));
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleCollectBadge = (badgeId: string) => {
    if (!collectedBadges.includes(badgeId)) {
      const updated = [...collectedBadges, badgeId];
      setCollectedBadges(updated);
      try {
        localStorage.setItem('rr_culture_passport', JSON.stringify(updated));
      } catch (e) {}
      setStampFeedback('Badge added to your Culture Passport!');
      setTimeout(() => setStampFeedback(null), 3000);
    }
  };

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East'];
  const filteredStates = selectedRegion === 'All' ? states : states.filter((s) => s.region === selectedRegion);

  const labels = {
    eyebrow:
      locale === 'hi'
        ? 'संपूर्ण भारत सांस्कृतिक अन्वेषण'
        : locale === 'gu'
        ? 'સમગ્ર ભારત સાંસ્કૃતિક અન્વેષણ'
        : 'Pan-Bharat Cultural Explorer',
    subtitle:
      locale === 'hi'
        ? 'सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों की परंपराएं, लोक कलाएं, व्यंजन और डिजिटल पासपोर्ट देखें।'
        : locale === 'gu'
        ? 'તમામ 28 રાજ્યો અને 8 કેન્દ્રશાસિત પ્રદેશોની પરંપરાઓ, લોકકલા અને વાનગીઓ જાણો.'
        : 'Explore unique rituals, folk arts, signature recipes, and collect stamps across all 28 States & 8 UTs.',
    passportTitle:
      locale === 'hi' ? 'सांस्कृतिक पासपोर्ट' : locale === 'gu' ? 'સાંસ્કૃતિક પાસપોર્ટ' : 'Culture Passport',
    collectedOf:
      locale === 'hi' ? 'संग्रहित बैज:' : locale === 'gu' ? 'સંગ્રહિત બેજ:' : 'Badges Collected:',
    selectStateMobile:
      locale === 'hi' ? 'राज्य / केंद्र शासित प्रदेश चुनें' : locale === 'gu' ? 'રાજ્ય / પ્રદેશ પસંદ કરો' : 'Select State / UT',
    capitalLabel: locale === 'hi' ? 'राजधानी:' : locale === 'gu' ? 'પાટનગર:' : 'Capital:',
    indiaSuffix: locale === 'hi' ? 'भारत' : locale === 'gu' ? 'ભારત' : 'India',
    regionSuffix: locale === 'hi' ? 'भारत क्षेत्र' : locale === 'gu' ? 'ભારત ક્ષેત્ર' : 'India Region',
    stampBtn: locale === 'hi' ? 'पासपोर्ट स्टैम्प करें' : locale === 'gu' ? 'પાસપોર્ટ સ્ટેમ્પ કરો' : 'Stamp Passport',
    collectedBtn: locale === 'hi' ? 'बैज संग्रहित' : locale === 'gu' ? 'બેજ સંગ્રહિત' : 'Badge Collected',
    majorFestivals:
      locale === 'hi' ? 'प्रमुख सांस्कृतिक पर्व' : locale === 'gu' ? 'મુખ્ય સાંસ્કૃતિક તહેવારો' : 'Major Cultural Celebrations',
    folkArts:
      locale === 'hi' ? 'लोक कला, संगीत एवं हस्तशिल्प' : locale === 'gu' ? 'લોકકલા, સંગીત અને હસ્તકલા' : 'Folk Arts, Music & Traditional Crafts',
    dishes:
      locale === 'hi' ? 'पारंपरिक उत्सव व्यंजन और प्रसाद' : locale === 'gu' ? 'પરંપરાગત વાનગીઓ અને પ્રસાદ' : 'Traditional Festive Food & Prasad',
  };

  return (
    <div className="bg-ivory-surface rounded-3xl p-4 sm:p-8 border border-gold/40 shadow-editorial">
      {/* Header & Passport stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 sm:pb-8 border-b border-gold/20 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-vermilion text-xs font-bold uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <span>{labels.eyebrow}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {dict.sections.regionalHeritage}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">{labels.subtitle}</p>
        </div>

        {/* Culture Passport Pill */}
        <div className="bg-ivory-light border border-gold/40 rounded-2xl p-4 flex items-center space-x-3 shadow-xs shrink-0">
          <div className="w-10 h-10 rounded-full bg-vermilion/10 text-vermilion flex items-center justify-center font-bold">
            <Award className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs font-semibold text-charcoal">{labels.passportTitle}</div>
            <div className="text-xs text-charcoal-muted">
              {labels.collectedOf}{' '}
              <span className="font-bold text-vermilion tabular-nums">{collectedBadges.length}</span> / {states.length}
            </div>
          </div>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="flex flex-wrap gap-2 py-5">
        {regions.map((region) => (
          <button
            type="button"
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedRegion === region
                ? 'bg-vermilion text-ivory-light font-bold shadow-xs'
                : 'bg-ivory hover:bg-gold/15 text-charcoal border border-gold/25'
            }`}
          >
            {region} {labels.indiaSuffix}
          </button>
        ))}
      </div>

      {/* Mobile Compact State Selector (avoids nested scroll traps on phones) */}
      <div className="lg:hidden mb-5">
        <label htmlFor="mobile-state-select" className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-1.5">
          {labels.selectStateMobile} ({filteredStates.length})
        </label>
        <select
          id="mobile-state-select"
          value={selectedState?.code || ''}
          onChange={(e) => {
            const match = states.find((s) => s.code === e.target.value);
            if (match) setSelectedState(match);
          }}
          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-ivory-light border border-gold/50 text-sm font-medium text-charcoal focus:outline-none focus:border-vermilion"
        >
          {filteredStates.map((st) => (
            <option key={st.code} value={st.code}>
              {st.name[locale]} ({st.code}) — {st.capital}
            </option>
          ))}
        </select>
      </div>

      {/* Interactive Grid & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop State Selection List */}
        <div className="hidden lg:block lg:col-span-5 max-h-[480px] overflow-y-auto pr-2 space-y-2">
          {filteredStates.map((st) => {
            const isSelected = selectedState.code === st.code;
            const isCollected = collectedBadges.includes(st.passportBadge.id);
            return (
              <button
                type="button"
                key={st.code}
                onClick={() => setSelectedState(st)}
                className={`w-full text-left min-h-[48px] p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-vermilion text-ivory-light border-vermilion shadow-md'
                    : 'bg-ivory-light hover:bg-gold/10 border-gold/30 text-charcoal'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-gold text-charcoal' : 'bg-gold/20 text-vermilion'
                  }`}>
                    {st.code}
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-semibold group-hover:text-gold transition-colors">
                      {st.name[locale]}
                    </h4>
                    <p className={`text-[11px] ${isSelected ? 'text-ivory-dark' : 'text-charcoal-muted'}`}>
                      {labels.capitalLabel} {st.capital} · {st.region}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isCollected && (
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-emerald-600'}`} />
                  )}
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-charcoal-muted'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected State Details Panel */}
        <div className="lg:col-span-7 bg-ivory-light rounded-2xl p-5 sm:p-6 border border-gold/40 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-gold font-bold">
                {selectedState.region} {labels.regionSuffix}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vermilion mt-1">
                {selectedState.name[locale]}
              </h3>
              <p className="text-xs text-charcoal-muted">{labels.capitalLabel} {selectedState.capital}</p>
            </div>

            {/* Passport Badge Claim Button */}
            <button
              type="button"
              onClick={() => handleCollectBadge(selectedState.passportBadge.id)}
              disabled={collectedBadges.includes(selectedState.passportBadge.id)}
              className={`min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                collectedBadges.includes(selectedState.passportBadge.id)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gold hover:bg-gold-300 text-charcoal shadow-sm'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>
                {collectedBadges.includes(selectedState.passportBadge.id) ? labels.collectedBtn : labels.stampBtn}
              </span>
            </button>
          </div>

          {stampFeedback && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs p-2.5 rounded-lg flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{stampFeedback}</span>
            </div>
          )}

          {/* Major Festivals in State */}
          <div>
            <h4 className="text-xs uppercase font-bold text-charcoal-muted tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{labels.majorFestivals}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedState.majorFestivals.map((festSlug) => (
                <Link
                  key={festSlug}
                  href={`/${locale}/festivals/${festSlug}`}
                  className="min-h-[40px] inline-flex items-center bg-ivory hover:bg-vermilion hover:text-ivory-light text-charcoal border border-gold/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                >
                  {festSlug.replace(/-/g, ' ').toUpperCase()} &rarr;
                </Link>
              ))}
            </div>
          </div>

          {/* Traditional Folk Arts */}
          <div>
            <h4 className="text-xs uppercase font-bold text-charcoal-muted tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Music className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{labels.folkArts}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedState.traditionalFolkArts.map((art, idx) => (
                <div key={idx} className="bg-ivory-surface p-3.5 rounded-xl border border-gold/20">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-serif font-bold text-sm text-charcoal">{art.name}</span>
                    <span className="text-[10px] bg-gold/20 text-vermilion px-2 py-0.5 rounded-full font-medium shrink-0">
                      {art.type}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted line-clamp-3">{art.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Famous Regional Delicacies */}
          <div>
            <h4 className="text-xs uppercase font-bold text-charcoal-muted tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Utensils className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{labels.dishes}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedState.famousDishes.map((dish, idx) => (
                <span
                  key={idx}
                  className="bg-gold/10 text-charcoal border border-gold/30 px-3 py-1 rounded-md text-xs font-medium"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

