'use client';

import React, { useState, useMemo } from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { VERIFIED_FESTIVALS, VERIFIED_RECIPES, ALL_INDIAN_STATES_UTS } from '../../../lib/data/verified-seeds';
import { OrnateBorderHeader, DiyaIcon } from '../../../components/MotifDecoration';
import Link from 'next/link';
import { Search, Sparkles, Utensils, MapPin, ChevronRight } from 'lucide-react';

export default function SearchPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Festivals' | 'Recipes' | 'Regions'>('All');

  const suggestions = ['Diwali', 'Holi', 'Onam', 'Sheer Khurma', 'Gujiya', 'Gujarat', 'Nagaland', 'Kerala'];

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { festivals: [], recipes: [], states: [] };

    const matchedFestivals = VERIFIED_FESTIVALS.filter(
      (f) =>
        f.title.en.toLowerCase().includes(q) ||
        f.title.hi.toLowerCase().includes(q) ||
        f.title.gu.toLowerCase().includes(q) ||
        f.shortSummary.en.toLowerCase().includes(q)
    );

    const matchedRecipes = VERIFIED_RECIPES.filter(
      (r) =>
        r.title.en.toLowerCase().includes(q) ||
        r.title.hi.toLowerCase().includes(q) ||
        r.title.gu.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q)
    );

    const matchedStates = ALL_INDIAN_STATES_UTS.filter(
      (s) =>
        s.name.en.toLowerCase().includes(q) ||
        s.name.hi.toLowerCase().includes(q) ||
        s.name.gu.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q)
    );

    return {
      festivals: matchedFestivals,
      recipes: matchedRecipes,
      states: matchedStates,
    };
  }, [query]);

  const totalResultsCount =
    results.festivals.length + results.recipes.length + results.states.length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 max-w-4xl">
      <OrnateBorderHeader
        title={dict.nav.search}
        subtitle="Search across India’s festivals, sacred traditions, festive recipes, and regional cultures"
      />

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.filters.searchPlaceholder}
          autoFocus
          className="w-full pl-12 pr-4 py-4 bg-ivory-surface border-2 border-gold/50 rounded-2xl text-base text-charcoal shadow-editorial focus:outline-hidden focus:ring-2 focus:ring-vermilion"
        />
      </div>

      {/* Suggested Search Query Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-charcoal-muted uppercase">Suggested:</span>
        {suggestions.map((sug) => (
          <button
            key={sug}
            onClick={() => setQuery(sug)}
            className="px-3 py-1 bg-ivory-surface hover:bg-gold/15 border border-gold/30 rounded-full text-xs text-charcoal transition-colors"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      {query && (
        <div className="flex items-center space-x-2 border-b border-gold/20 pb-2">
          {(['All', 'Festivals', 'Recipes', 'Regions'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-vermilion text-ivory-light shadow-xs'
                  : 'text-charcoal hover:bg-gold/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results List */}
      {query && totalResultsCount === 0 ? (
        <div className="text-center py-16 bg-ivory-surface rounded-3xl border border-gold/30 p-8">
          <DiyaIcon className="w-12 h-12 text-gold/40 mx-auto mb-3" />
          <h4 className="font-serif text-xl font-bold text-charcoal">
            No matches found for "{query}"
          </h4>
          <p className="text-xs text-charcoal-muted mt-2">
            Try searching for a different festival name, regional specialty, or traditional Indian state.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Festivals */}
          {(activeCategory === 'All' || activeCategory === 'Festivals') &&
            results.festivals.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-charcoal-muted uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Festivals ({results.festivals.length})</span>
                </h3>
                <div className="space-y-2">
                  {results.festivals.map((f) => (
                    <Link
                      key={f.id}
                      href={`/${loc}/festivals/${f.slug}`}
                      className="block p-4 rounded-2xl bg-ivory-surface border border-gold/30 hover:border-gold hover:shadow-editorial transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-lg text-charcoal hover:text-vermilion">
                          {f.title[loc]}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">
                        {f.shortSummary[loc]}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {/* Recipes */}
          {(activeCategory === 'All' || activeCategory === 'Recipes') &&
            results.recipes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-charcoal-muted uppercase tracking-wider flex items-center space-x-1.5">
                  <Utensils className="w-4 h-4 text-gold" />
                  <span>Festive Recipes ({results.recipes.length})</span>
                </h3>
                <div className="space-y-2">
                  {results.recipes.map((r) => (
                    <Link
                      key={r.id}
                      href={`/${loc}/recipes/${r.slug}`}
                      className="block p-4 rounded-2xl bg-ivory-surface border border-gold/30 hover:border-gold hover:shadow-editorial transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-lg text-charcoal hover:text-vermilion">
                          {r.title[loc]}
                        </span>
                        <span className="text-xs text-charcoal-muted">{r.region}</span>
                      </div>
                      <p className="text-xs text-charcoal-muted mt-1 line-clamp-1">
                        {r.culturalStory[loc]}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {/* States */}
          {(activeCategory === 'All' || activeCategory === 'Regions') &&
            results.states.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-charcoal-muted uppercase tracking-wider flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>States & Union Territories ({results.states.length})</span>
                </h3>
                <div className="space-y-2">
                  {results.states.map((s) => (
                    <Link
                      key={s.code}
                      href={`/${loc}/explorer`}
                      className="block p-4 rounded-2xl bg-ivory-surface border border-gold/30 hover:border-gold hover:shadow-editorial transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-lg text-charcoal hover:text-vermilion">
                          {s.name[loc]} ({s.code})
                        </span>
                        <span className="text-xs text-charcoal-muted">Capital: {s.capital}</span>
                      </div>
                      <p className="text-xs text-charcoal-muted mt-1">
                        Region: {s.region} India • Dishes: {s.famousDishes.join(', ')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

