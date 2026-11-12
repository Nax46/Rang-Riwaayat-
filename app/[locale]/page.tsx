import React from 'react';
import { Locale } from '../../lib/types';
import { getDictionary } from '../../lib/i18n';
import {
  getFestivals,
  getOccurrences,
  getAllStatesUTs,
  getRecipes
} from '../../lib/db/store';
import { getCurrentYear, getUpcomingYear, getTodayISODate, isToday, isUpcoming } from '../../lib/utils/date';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Calendar,
  Compass,
  ArrowRight,
  Utensils,
  Palette,
  Gamepad2,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { DiyaIcon, MandalaIcon, OrnateBorderHeader } from '../../components/MotifDecoration';
import { FestivalCountdown } from '../../components/FestivalCountdown';
import { IndiaStateExplorer } from '../../components/IndiaStateExplorer';
import { CelebrationStudioCardMaker } from '../../components/CelebrationStudioCardMaker';
import { MultiplayerGameArena } from '../../components/MultiplayerGameArena';
import { RRAdSlot } from '../../components/RRAdSlot';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  const currentYear = getCurrentYear();
  const nextYear = getUpcomingYear();

  const [festivals, currentOccurrences, futureOccurrences, states, recipes] = await Promise.all([
    getFestivals(),
    getOccurrences(currentYear),
    getOccurrences(nextYear),
    getAllStatesUTs(),
    getRecipes(),
  ]);

  const allActiveOccurrences = [...currentOccurrences, ...futureOccurrences];

  // Prioritize today's celebration if active today, else find next upcoming
  const todayOcc = currentOccurrences.find((o) => isToday(o.primaryDate));
  let featuredOccurrence = todayOcc;
  let featuredFestival = todayOcc ? festivals.find((f) => f.slug === todayOcc.festivalSlug) : null;

  if (!featuredOccurrence || !featuredFestival) {
    const upcomingOcc = allActiveOccurrences
      .filter((o) => isUpcoming(o.primaryDate))
      .sort((a, b) => new Date(a.primaryDate).getTime() - new Date(b.primaryDate).getTime())[0];

    featuredOccurrence = upcomingOcc || currentOccurrences[0];
    featuredFestival = festivals.find((f) => f.slug === featuredOccurrence?.festivalSlug) || festivals[0] || null;
  }

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Large Editorial Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory-surface via-ivory-light to-ivory py-16 sm:py-24 border-b border-gold/30">
        <div className="absolute inset-0 bg-pattern-rangoli opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gold/15 border border-gold/40 text-vermilion text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
              <DiyaIcon className="w-4 h-4 text-gold" />
              <span>{dict.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-charcoal tracking-tight leading-[1.15]">
              {dict.hero.heading}
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto font-sans leading-relaxed">
              {dict.hero.subheading}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href={`/${loc}/festivals`}
                className="bg-vermilion hover:bg-vermilion-600 text-ivory-light font-bold px-7 py-4 rounded-2xl shadow-editorial hover:shadow-editorial-lg text-sm transition-all hover:scale-105 flex items-center space-x-2"
              >
                <span>{dict.hero.exploreCta}</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
              <Link
                href={`/${loc}/calendar`}
                className="bg-ivory-surface hover:bg-gold/15 text-charcoal border-2 border-gold/60 font-bold px-7 py-4 rounded-2xl shadow-xs text-sm transition-all hover:scale-105 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-vermilion" />
                <span>{dict.hero.calendarCta}</span>
              </Link>
              <Link
                href={`/${loc}/studio`}
                className="bg-gold hover:bg-gold-300 text-charcoal font-bold px-7 py-4 rounded-2xl shadow-xs text-sm transition-all hover:scale-105 flex items-center space-x-2"
              >
                <Palette className="w-4 h-4 text-vermilion" />
                <span>{dict.hero.studioCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Festival Countdown Banner */}
      {featuredFestival && featuredOccurrence && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FestivalCountdown festival={featuredFestival} occurrence={featuredOccurrence} locale={loc} />
        </section>
      )}

      {/* 3. Today's & Upcoming Celebrations Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <OrnateBorderHeader
          title={dict.sections.upcomingFestivals}
          subtitle="Verified Pan-India dates cross-referenced with national astronomical and religious calendars"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {festivals.slice(0, 6).map((fest) => {
            const currentOcc = currentOccurrences.find((o) => o.festivalSlug === fest.slug);
            const futureOcc = futureOccurrences.find((o) => o.festivalSlug === fest.slug);

            // Prefer current year if today or upcoming; if past in 2026, show 2027 upcoming date
            let occ = currentOcc;
            let isUpcomingInNextYear = false;
            if (currentOcc && isToday(currentOcc.primaryDate)) {
              occ = currentOcc;
            } else if (currentOcc && isUpcoming(currentOcc.primaryDate)) {
              occ = currentOcc;
            } else if (futureOcc) {
              occ = futureOcc;
              isUpcomingInNextYear = true;
            }

            const isTodayCard = occ ? isToday(occ.primaryDate) : false;
            const dateStr = occ
              ? new Date(occ.primaryDate).toLocaleDateString(
                  loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )
              : 'Verified Observance';

            return (
              <article
                key={fest.id}
                className={`group bg-ivory-surface rounded-3xl border ${isTodayCard ? 'border-gold ring-2 ring-gold/50 shadow-editorial-lg' : 'border-gold/40 shadow-editorial'} hover:shadow-editorial-lg transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Hero Image */}
                <div className="relative h-52 w-full overflow-hidden bg-charcoal">
                  <Image
                    src={fest.heroImage.url}
                    alt={fest.heroImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-ivory-light">
                    <span className="bg-gold text-charcoal font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      {fest.category}
                    </span>
                    {isTodayCard ? (
                      <span className="font-bold bg-vermilion text-ivory-light px-2.5 py-0.5 rounded-md shadow-sm animate-pulse flex items-center space-x-1">
                        <span>🎉</span>
                        <span>{loc === 'hi' ? 'आज का पावन पर्व!' : loc === 'gu' ? 'આજનો પાવન અવસર!' : 'Celebrating Today!'}</span>
                      </span>
                    ) : (
                      <span className="font-mono bg-charcoal/80 px-2 py-0.5 rounded-md border border-gold/30">
                        📅 {dateStr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-vermilion transition-colors">
                      <Link href={`/${loc}/festivals/${fest.slug}`}>
                        {fest.title[loc]}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted mt-2 line-clamp-3 leading-relaxed">
                      {fest.shortSummary[loc]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                    <Link
                      href={`/${loc}/festivals/${fest.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-vermilion hover:text-vermilion-700 transition-colors"
                    >
                      <span>{dict.cards.viewDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center space-x-1 text-[11px] text-charcoal-soft">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      <span>{fest.sources[0]?.type || 'Verified'}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Link
            href={`/${loc}/festivals`}
            className="inline-flex items-center space-x-2 bg-ivory-surface hover:bg-gold/15 text-vermilion border-2 border-vermilion font-bold px-8 py-3.5 rounded-2xl shadow-xs text-sm transition-all"
          >
            <span>View All Festival Guides & Panchang Records</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Configurable Safe Ad Placement */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RRAdSlot slotId="home-after-festivals" />
      </div>

      {/* 4. Explore India's Regions & Culture Passport Explorer */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <IndiaStateExplorer states={states} locale={loc} />
      </section>

      {/* 5. Celebration Studio — Interactive Greeting Card Maker */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <OrnateBorderHeader
          title={dict.sections.celebrationStudio}
          subtitle="Generate high-resolution printable and shareable greeting cards locally in your browser"
        />
        <CelebrationStudioCardMaker locale={loc} />
      </section>

      {/* 6. Food & Recipes — Sacred Prasad & Festive Feast */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <OrnateBorderHeader
          title={dict.sections.culinaryHeritage}
          subtitle="Traditional festive recipes with dynamic ingredient scaling and step-by-step cooking timers"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-ivory-surface rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-editorial hover:shadow-editorial-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gold/20 text-vermilion font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {recipe.region}
                </span>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  🌱 {recipe.dietaryType}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-charcoal">
                <Link href={`/${loc}/recipes/${recipe.slug}`} className="hover:text-vermilion transition-colors">
                  {recipe.title[loc]}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-2">
                {recipe.culturalStory[loc]}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gold/20 text-xs">
                <span className="text-charcoal-muted">
                  ⏱️ Prep: {recipe.prepTimeMinutes}m | Cook: {recipe.cookTimeMinutes}m
                </span>
                <Link
                  href={`/${loc}/recipes/${recipe.slug}`}
                  className="bg-gold hover:bg-gold-300 text-charcoal font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  {dict.cards.viewRecipe} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Fun Zone & Multiplayer Game Arena */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <OrnateBorderHeader
          title={dict.sections.funZoneTitle}
          subtitle="Realtime synchronized cultural trivia games: Festival Battle, Guess the Festival, and Food Detective"
        />
        <MultiplayerGameArena locale={loc} />
      </section>

      {/* 8. Cultural Dispatch & Newsletter */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-vermilion via-vermilion-700 to-vermilion-800 rounded-3xl p-8 sm:p-12 text-ivory-light shadow-editorial-lg border border-gold/40 text-center max-w-3xl mx-auto space-y-4">
          <MandalaIcon className="w-10 h-10 text-gold mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            {dict.sections.newsletterTitle}
          </h3>
          <p className="text-xs sm:text-sm text-ivory-dark max-w-lg mx-auto">
            {dict.sections.newsletterSubtitle}
          </p>

          <form
            action="#"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-3 rounded-xl bg-ivory-surface text-charcoal text-sm border border-gold/40 focus:outline-hidden"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-gold hover:bg-gold-300 text-charcoal font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all shrink-0"
            >
              {dict.sections.newsletterButton}
            </button>
          </form>
          <p className="text-[10px] text-ivory-dark/70">
            No spam. Unsubscribe at any time. Sourced with respect for India’s traditions.
          </p>
        </div>
      </section>
    </div>
  );
}
