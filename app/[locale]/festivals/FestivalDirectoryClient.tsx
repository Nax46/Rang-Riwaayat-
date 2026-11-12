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

  const months = [
    { num: 'All', label: 'All Months' },
    { num: '1', label: 'January' },
    { num: '2', label: 'February' },
    { num: '3', label: 'March' },
    { num: '4', label: 'April' },
    { num: '5', label: 'May' },
    { num: '6', label: 'June' },
    { num: '7', label: 'July' },
    { num: '8', label: 'August' },
    { num: '9', label: 'September' },
    { num: '10', label: 'October' },
    { num: '11', label: 'November' },
    { num: '12', label: 'December' },
  ];

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
        const matchesSummary = fest.shortSummary.en.toLowerCase().includes(q);
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
      <div className="bg-ivory-surface p-6 rounded-3xl border border-gold/40 shadow-editorial space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.filters.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-ivory-light border border-gold/40 rounded-2xl text-sm text-charcoal focus:outline-hidden focus:ring-2 focus:ring-vermilion"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
          {/* Month */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-2.5 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden"
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
              Community
            </label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full p-2.5 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden"
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
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden"
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
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2.5 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden"
            >
              <option value="date">Observance Date</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* View Mode & Reset */}
          <div className="flex items-end space-x-2">
            <div className="flex bg-ivory-light border border-gold/40 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs ${
                  viewMode === 'grid' ? 'bg-vermilion text-ivory-light' : 'text-charcoal'
                }`}
                title="Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-xs ${
                  viewMode === 'list' ? 'bg-vermilion text-ivory-light' : 'text-charcoal'
                }`}
                title="List"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={resetFilters}
              className="p-2.5 bg-ivory-light hover:bg-gold/15 border border-gold/40 rounded-xl text-charcoal text-xs font-semibold flex items-center justify-center space-x-1"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-charcoal-muted px-2">
        <span>
          Showing <strong className="text-vermilion">{filteredFestivals.length}</strong> festivals
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
            onClick={resetFilters}
            className="mt-4 px-5 py-2.5 bg-vermilion text-ivory-light text-xs font-bold rounded-xl"
          >
            {dict.filters.clearFilters}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFestivals.map((fest) => {
            const occ = occurrences.find((o) => o.festivalSlug === fest.slug);
            const dateFormatted = occ
              ? new Date(occ.primaryDate).toLocaleDateString(
                  locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )
              : 'Verified Observance';

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
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-ivory-light">
                    <span className="bg-gold text-charcoal font-bold px-2 py-0.5 rounded-md">
                      {fest.category}
                    </span>
                    <span className="font-mono bg-charcoal/70 px-2 py-0.5 rounded-md border border-gold/30">
                      📅 {dateFormatted}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-vermilion transition-colors">
                      <Link href={`/${locale}/festivals/${fest.slug}`}>
                        {fest.title[locale]}
                      </Link>
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-2 line-clamp-3 leading-relaxed">
                      {fest.shortSummary[locale]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                    <Link
                      href={`/${locale}/festivals/${fest.slug}`}
                      className="text-xs font-bold text-vermilion hover:underline flex items-center space-x-1"
                    >
                      <span>{dict.cards.viewDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <span className="text-[11px] text-charcoal-soft">
                      {fest.statesCovered[0] || 'All India'}
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
              : 'Verified Observance';

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
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] bg-gold/20 text-vermilion font-bold px-2 py-0.5 rounded-md">
                        {fest.category}
                      </span>
                      <span className="text-[11px] text-charcoal-muted font-mono">{dateFormatted}</span>
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
                  className="bg-ivory-light hover:bg-gold/20 text-vermilion border border-gold/40 text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors"
                >
                  {dict.cards.viewDetails} →
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

