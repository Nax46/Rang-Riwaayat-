'use client';

import React, { useState, useMemo } from 'react';
import { Festival, FestivalOccurrence, Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  Grid,
  List,
  Sparkles,
  Calendar,
  ShieldCheck,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { DiyaIcon } from '../../../components/MotifDecoration';

interface DirectoryProps {
  initialFestivals: Festival[];
  occurrences: FestivalOccurrence[];
  locale: Locale;
}

export function FestivalDirectoryClient({ initialFestivals, occurrences, locale }: DirectoryProps) {
  const dict = getDictionary(locale);

  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const communities = [
    'All',
    'Hindu',
    'Muslim',
    'Sikh',
    'Christian',
    'Jain',
    'Buddhist',
    'Tribal & Indigenous',
    'Secular & National',
  ];

  const categories = [
    'All',
    'Harvest & Agricultural',
    'Spiritual & Devotional',
    'Seasonal & New Year',
    'Cultural & Folk',
  ];

  const monthNames =
    locale === 'hi'
      ? [
          'सभी महीने',
          'जनवरी',
          'फ़रवरी',
          'मार्च',
          'अप्रैल',
          'मई',
          'जून',
          'जुलाई',
          'अगस्त',
          'सितंबर',
          'अक्टूबर',
          'नवंबर',
          'दिसंबर',
        ]
      : locale === 'gu'
      ? [
          'બધા મહિના',
          'જાન્યુઆરી',
          'ફેબ્રુઆરી',
          'માર્ચ',
          'એપ્રિલ',
          'મે',
          'જૂન',
          'જુલાઈ',
          'ઑગસ્ટ',
          'સપ્ટેમ્બર',
          'ઑક્ટોબર',
          'નવેમ્બર',
          'ડિસેમ્બર',
        ]
      : [
          'All Months',
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

  const months = [
    { num: 'All', label: monthNames[0] },
    ...Array.from({ length: 12 }, (_, idx) => ({
      num: String(idx + 1),
      label: monthNames[idx + 1],
    })),
  ];

  const uiLabels = {
    month: locale === 'hi' ? 'माह' : locale === 'gu' ? 'મહિનો' : 'Month',
    community: locale === 'hi' ? 'समुदाय / परंपरा' : locale === 'gu' ? 'પરંપરા / સમુદાય' : 'Community',
    category: locale === 'hi' ? 'श्रेणी' : locale === 'gu' ? 'શ્રેણી' : 'Category',
    sortBy: locale === 'hi' ? 'क्रमबद्ध करें' : locale === 'gu' ? 'ક્રમ' : 'Sort By',
    sortDate: locale === 'hi' ? 'तिथि अनुसार' : locale === 'gu' ? 'તારીખ મુજબ' : 'Observance Date',
    sortName: locale === 'hi' ? 'वर्णमाला अनुसार' : locale === 'gu' ? 'કક્કાવારી મુજબ' : 'Alphabetical (A-Z)',
    showingPrefix: locale === 'hi' ? 'कुल' : locale === 'gu' ? 'કુલ' : 'Showing',
    showingSuffix: locale === 'hi' ? 'पर्व प्रदर्शित' : locale === 'gu' ? 'તહેવારો' : 'festivals',
    verifiedFallback:
      locale === 'hi' ? 'सत्यापित तिथि' : locale === 'gu' ? 'પ્રમાણિત તિથિ' : 'Verified Observance',
    allIndia: locale === 'hi' ? 'संपूर्ण भारत' : locale === 'gu' ? 'સમગ્ર ભારત' : 'All India',
    resetLabel: locale === 'hi' ? 'रीसेट' : locale === 'gu' ? 'રીસેટ' : 'Reset',
  };

  const filteredFestivals = useMemo(() => {
    return initialFestivals.filter((fest) => {
      // Community filter
      if (selectedCommunity !== 'All' && !fest.communities.includes(selectedCommunity as any)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && fest.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesTitle =
          fest.title.en.toLowerCase().includes(q) ||
          fest.title.hi.toLowerCase().includes(q) ||
          fest.title.gu.toLowerCase().includes(q);
        const matchesSummary =
          fest.shortSummary.en.toLowerCase().includes(q) ||
          fest.shortSummary.hi.toLowerCase().includes(q) ||
          fest.shortSummary.gu.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary) return false;
      }
      // Month filter
      if (selectedMonth !== 'All') {
        const occ = occurrences.find((o) => o.festivalSlug === fest.slug);
        if (!occ) return false;
        const occMonth = new Date(occ.primaryDate).getMonth() + 1;
        if (occMonth !== parseInt(selectedMonth, 10)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.title[locale].localeCompare(b.title[locale]);
      }
      // Default: sort by occurrence date
      const occA = occurrences.find((o) => o.festivalSlug === a.slug)?.primaryDate || '9999';
      const occB = occurrences.find((o) => o.festivalSlug === b.slug)?.primaryDate || '9999';
      return occA.localeCompare(occB);
    });
  }, [initialFestivals, occurrences, selectedCommunity, selectedCategory, search, selectedMonth, sortBy, locale]);

  const resetFilters = () => {
    setSearch('');
    setSelectedMonth('All');
    setSelectedCommunity('All');
    setSelectedCategory('All');
    setSortBy('date');
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-ivory-surface p-5 sm:p-6 rounded-3xl border border-gold/40 shadow-editorial space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.filters.searchPlaceholder}
            aria-label={dict.filters.searchPlaceholder}
            className="w-full min-h-[48px] pl-12 pr-4 py-3 bg-ivory-light border border-gold/40 rounded-2xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-vermilion"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {/* Month */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              {uiLabels.month}
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-none"
            >
              {months.map((m) => (
                <option key={m.num} value={m.num}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Community */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              {uiLabels.community}
            </label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-none"
            >
              {communities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              {uiLabels.category}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              {uiLabels.sortBy}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full min-h-[44px] px-3 py-2 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-none"
            >
              <option value="date">{uiLabels.sortDate}</option>
              <option value="name">{uiLabels.sortName}</option>
            </select>
          </div>

          {/* View Mode & Reset */}
          <div className="flex items-end gap-2">
            <div className="flex bg-ivory-light border border-gold/40 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs ${
                  viewMode === 'grid' ? 'bg-vermilion text-ivory-light' : 'text-charcoal'
                }`}
                title="Grid"
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs ${
                  viewMode === 'list' ? 'bg-vermilion text-ivory-light' : 'text-charcoal'
                }`}
                title="List"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="flex-1 min-h-[44px] px-3 bg-ivory-light hover:bg-gold/15 border border-gold/40 rounded-xl text-charcoal text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              title={uiLabels.resetLabel}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{uiLabels.resetLabel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-charcoal-muted px-2">
        <span>
          {uiLabels.showingPrefix}{' '}
          <strong className="text-vermilion">{filteredFestivals.length}</strong>{' '}
          {uiLabels.showingSuffix}
        </span>
      </div>

      {/* Grid or List Representation */}
      {filteredFestivals.length === 0 ? (
        <div className="text-center py-16 bg-ivory-surface rounded-3xl border border-gold/30 p-8">
          <DiyaIcon className="w-12 h-12 text-gold/40 mx-auto mb-3" />
          <h4 className="font-serif text-xl font-bold text-charcoal">
            {dict.cards.emptyFestivalsTitle}
          </h4>
          <p className="text-xs text-charcoal-muted mt-2 max-w-md mx-auto">
            {dict.cards.emptyFestivalsSubtitle}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 min-h-[44px] px-5 py-2.5 bg-vermilion text-ivory-light text-xs font-bold rounded-xl"
          >
            {dict.filters.clearFilters}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFestivals.map((fest) => {
            const occ = occurrences.find((o) => o.festivalSlug === fest.slug);
            const dateFormatted = occ
              ? new Date(occ.primaryDate).toLocaleDateString(
                  locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )
              : uiLabels.verifiedFallback;

            return (
              <article
                key={fest.id}
                className="group bg-ivory-surface rounded-3xl border border-gold/40 shadow-editorial hover:shadow-editorial-lg transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="relative h-52 w-full bg-charcoal overflow-hidden">
                  <Image
                    src={fest.heroImage.url}
                    alt={fest.heroImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-ivory-light">
                    <span className="bg-gold text-charcoal font-bold px-2.5 py-1 rounded-md">
                      {fest.category}
                    </span>
                    <span className="font-medium bg-charcoal/80 px-2.5 py-1 rounded-md border border-gold/30 inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{dateFormatted}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-vermilion transition-colors">
                      <Link href={`/${locale}/festivals/${fest.slug}`}>
                        {fest.title[locale]}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted mt-2 line-clamp-3 leading-relaxed">
                      {fest.shortSummary[locale]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                    <Link
                      href={`/${locale}/festivals/${fest.slug}`}
                      className="min-h-[44px] text-xs font-bold text-vermilion hover:underline inline-flex items-center space-x-1"
                    >
                      <span>{dict.cards.viewDetails}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <span className="text-[11px] text-charcoal-soft">
                      {fest.statesCovered[0] || uiLabels.allIndia}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredFestivals.map((fest) => {
            const occ = occurrences.find((o) => o.festivalSlug === fest.slug);
            const dateFormatted = occ
              ? new Date(occ.primaryDate).toLocaleDateString(
                  locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN',
                  { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
                )
              : uiLabels.verifiedFallback;

            return (
              <article
                key={fest.id}
                className="bg-ivory-surface rounded-2xl border border-gold/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:shadow-editorial transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-charcoal shrink-0 border border-gold/40">
                    <Image
                      src={fest.heroImage.url}
                      alt={fest.heroImage.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] bg-gold/20 text-vermilion font-bold px-2 py-0.5 rounded-md">
                        {fest.category}
                      </span>
                      <span className="text-[11px] text-charcoal-muted font-medium">{dateFormatted}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-charcoal hover:text-vermilion transition-colors">
                      <Link href={`/${locale}/festivals/${fest.slug}`}>
                        {fest.title[locale]}
                      </Link>
                    </h3>
                    <p className="text-xs text-charcoal-muted line-clamp-1 mt-1">
                      {fest.shortSummary[locale]}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/${locale}/festivals/${fest.slug}`}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center bg-ivory-light hover:bg-gold/20 text-vermilion border border-gold/40 text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors"
                >
                  {dict.cards.viewDetails} &rarr;
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

