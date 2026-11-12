import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '../../../../lib/types';
import { getDictionary } from '../../../../lib/i18n';
import { getFestivalWithOccurrence, getFestivals, getRecipes } from '../../../../lib/db/store';
import { isToday } from '../../../../lib/utils/date';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ShieldCheck,
  BookOpen,
  Share2,
  Sparkles,
  MapPin,
  Utensils,
  Palette,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  History,
  Flame
} from 'lucide-react';
import { DiyaIcon, MandalaIcon, OrnateBorderHeader } from '../../../../components/MotifDecoration';
import { RRAdSlot } from '../../../../components/RRAdSlot';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const locales = ['en', 'hi', 'gu'];
  const slugs = ['diwali', 'holi', 'eid-ul-fitr', 'guru-nanak-jayanti', 'onam', 'durga-puja', 'hornbill-festival'];
  const params: Array<{ locale: string; slug: string }> = [];
  for (const loc of locales) {
    for (const slug of slugs) {
      params.push({ locale: loc, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const data = await getFestivalWithOccurrence(params.slug);
  if (!data) return {};

  const { festival, occurrence, targetYear } = data;
  return {
    title: `${festival.title[loc]} (${targetYear}) — Comprehensive Cultural Guide`,
    description: festival.shortSummary[loc],
    openGraph: {
      title: `${festival.title[loc]} (${targetYear})`,
      description: festival.shortSummary[loc],
      images: [festival.heroImage.url],
    },
  };
}

export default async function FestivalDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  const data = await getFestivalWithOccurrence(params.slug);
  if (!data) {
    notFound();
  }

  const { festival, occurrence, futureOccurrence, historicalOccurrence, targetYear } = data;
  const relatedRecipes = await getRecipes({ festivalSlug: festival.slug });
  const allFestivals = await getFestivals();
  const relatedFestivals = allFestivals.filter((f) => f.slug !== festival.slug).slice(0, 3);

  const primaryDateFormatted = occurrence
    ? new Date(occurrence.primaryDate).toLocaleDateString(
        loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
        { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
      )
    : 'Annual Observance';

  return (
    <article className="pb-24">
      {/* 1. Hero Image & Title Banner */}
      <div className="relative h-[420px] sm:h-[500px] w-full bg-charcoal overflow-hidden border-b-4 border-gold">
        <Image
          src={festival.heroImage.url}
          alt={festival.heroImage.alt}
          fill
          priority
          className="object-cover opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 absolute bottom-8 left-0 right-0 z-10 text-ivory-light">
          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gold text-charcoal font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {festival.category}
              </span>
              <span className="bg-vermilion/90 border border-gold/40 text-ivory-light text-xs px-3 py-1 rounded-full font-medium">
                {festival.communities.join(' · ')}
              </span>
              <span className="bg-charcoal/80 text-ivory-dark text-xs px-3 py-1 rounded-full border border-gold/30">
                Verified: {festival.lastVerifiedDate}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-ivory-surface tracking-tight">
              {festival.title[loc]}
            </h1>

            <p className="text-sm sm:text-base text-ivory-dark font-sans leading-relaxed max-w-2xl">
              {festival.shortSummary[loc]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Main Editorial Body */}
          <div className="lg:col-span-8 space-y-12">
            {/* Verified Date & Muhurat Card */}
            {occurrence && (
              <div className="space-y-4">
                <div className={`bg-gradient-to-br from-gold/15 via-ivory-light to-ivory-surface p-6 rounded-3xl border ${
                  isToday(occurrence.primaryDate) ? 'border-gold ring-2 ring-gold/60 shadow-editorial-lg' : 'border-gold/50 shadow-xs'
                } space-y-3`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-vermilion font-bold text-xs uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>{occurrence.year} Astronomical & Tithi Observance</span>
                    </div>
                    {isToday(occurrence.primaryDate) && (
                      <span className="bg-vermilion text-ivory-light text-xs font-bold px-3 py-1 rounded-full shadow-xs animate-pulse flex items-center space-x-1.5">
                        <Flame className="w-3.5 h-3.5 text-gold" />
                        <span>Celebrating Today!</span>
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {primaryDateFormatted}
                  </div>
                  {occurrence.regionalObservances[0]?.tithiOrPanchang && (
                    <p className="text-xs sm:text-sm text-charcoal-muted font-sans">
                      📜 <strong>Panchang Tithi:</strong> {occurrence.regionalObservances[0].tithiOrPanchang}
                    </p>
                  )}
                  {occurrence.regionalObservances[0]?.muhuratVerified && (
                    <p className="text-xs sm:text-sm text-vermilion font-sans font-semibold">
                      ⏳ <strong>Verified Muhurat:</strong> {occurrence.regionalObservances[0].muhuratVerified}
                    </p>
                  )}
                </div>

                {/* Upcoming Future Observance Preview (2027) */}
                {futureOccurrence && (
                  <div className="bg-ivory-surface p-4 rounded-2xl border border-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="text-charcoal-muted font-medium">Upcoming in {futureOccurrence.year}:</span>
                      <strong className="text-charcoal font-serif text-sm">
                        {new Date(futureOccurrence.primaryDate).toLocaleDateString(
                          loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
                          { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }
                        )}
                      </strong>
                    </div>
                    {futureOccurrence.regionalObservances[0]?.tithiOrPanchang && (
                      <span className="bg-gold/15 text-charcoal px-2.5 py-1 rounded-md border border-gold/30">
                        {futureOccurrence.regionalObservances[0].tithiOrPanchang}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Why It Is Celebrated */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <DiyaIcon className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  Why It Is Celebrated
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line bg-ivory-surface p-6 rounded-2xl border border-gold/20">
                {festival.whyCelebrated[loc]}
              </p>
            </section>

            {/* History and Significance */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  History & Cultural Significance
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line bg-ivory-surface p-6 rounded-2xl border border-gold/20">
                {festival.historyAndSignificance[loc]}
              </p>
            </section>

            {/* Ad Placement between long editorial sections */}
            <RRAdSlot slotId="festival-body-mid" />

            {/* Regional Observances and Variations */}
            {occurrence && occurrence.regionalObservances.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    Regional Traditions & Variations
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {occurrence.regionalObservances.map((reg, idx) => (
                    <div
                      key={idx}
                      className="bg-ivory-surface p-5 rounded-2xl border border-gold/30 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-vermilion">
                          {reg.regionOrState}
                        </span>
                        {reg.calendarSystem && (
                          <span className="text-[10px] bg-gold/20 text-charcoal px-2 py-0.5 rounded-full font-medium">
                            {reg.calendarSystem}
                          </span>
                        )}
                      </div>
                      {reg.variationName && (
                        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                          {reg.variationName}
                        </h4>
                      )}
                      <ul className="text-xs text-charcoal-muted space-y-1 list-disc list-inside">
                        {reg.distinctCustoms.map((custom, cIdx) => (
                          <li key={cIdx}>{custom}</li>
                        ))}
                      </ul>
                      {reg.notes && (
                        <p className="text-[11px] text-charcoal-soft italic pt-1 border-t border-gold/20">
                          {reg.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rituals and Customs */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  Rituals & Sacred Customs
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line bg-ivory-surface p-6 rounded-2xl border border-gold/20">
                {festival.ritualsAndCustoms[loc]}
              </p>
            </section>

            {/* Traditional Food & Festive Recipes */}
            {relatedRecipes.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    Associated Festive Delicacies
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedRecipes.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-ivory-surface p-5 rounded-2xl border border-gold/40 space-y-2 shadow-xs"
                    >
                      <h4 className="font-serif font-bold text-lg text-charcoal">
                        {rec.title[loc]}
                      </h4>
                      <p className="text-xs text-charcoal-muted line-clamp-2">
                        {rec.culturalStory[loc]}
                      </p>
                      <Link
                        href={`/${loc}/recipes/${rec.slug}`}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-vermilion hover:underline pt-2"
                      >
                        <span>View Interactive Recipe & Timers</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Decoration Ideas */}
            {festival.decorationIdeas[loc] && festival.decorationIdeas[loc].length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    Auspicious Home Decor & Rangoli Ideas
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {festival.decorationIdeas[loc].map((idea, idx) => (
                    <div
                      key={idx}
                      className="bg-ivory-light p-4 rounded-xl border border-gold/30 text-xs sm:text-sm text-charcoal flex items-start space-x-2.5"
                    >
                      <span className="text-gold font-bold">✦</span>
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Frequently Asked Questions */}
            {festival.faqs && festival.faqs.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {festival.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-ivory-surface p-5 rounded-2xl border border-gold/30 space-y-2 shadow-xs"
                    >
                      <h4 className="font-serif font-bold text-base text-charcoal">
                        {faq.question[loc]}
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {faq.answer[loc]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Primary Sources & References */}
            <section className="bg-ivory-light p-6 rounded-3xl border border-gold/40 space-y-3">
              <div className="flex items-center space-x-2 text-charcoal font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Verified Primary Institutional Sources</span>
              </div>
              <ul className="text-xs text-charcoal-muted space-y-2">
                {festival.sources.map((src) => (
                  <li key={src.id} className="border-b border-gold/20 pb-2 last:border-0">
                    <strong className="text-charcoal font-semibold">{src.title}</strong> — {src.publisherOrInstitution} ({src.type})
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-vermilion ml-2 hover:underline"
                      >
                        <span>Archive Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] text-charcoal-soft flex items-center justify-between">
                <span>Last verified date: {festival.lastVerifiedDate}</span>
                <Link
                  href={`/${loc}/corrections`}
                  className="text-vermilion hover:underline font-semibold"
                >
                  Report Observation / Suggest Nuance →
                </Link>
              </div>
            </section>

            {/* Historical Observance Archive (2025) */}
            {historicalOccurrence && (
              <section className="bg-charcoal/5 p-6 rounded-3xl border border-charcoal/20 space-y-3">
                <div className="flex items-center space-x-2 text-charcoal font-bold text-xs uppercase tracking-wider">
                  <History className="w-4 h-4 text-gold" />
                  <span>Historical Observance Archive (2025)</span>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  In 2025, {festival.title[loc]} was observed on{' '}
                  <strong className="text-charcoal font-semibold">
                    {new Date(historicalOccurrence.primaryDate).toLocaleDateString(
                      loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
                      { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
                    )}
                  </strong>
                  . This record is maintained for cultural, astrological, and comparative historical documentation.
                </p>
                {historicalOccurrence.regionalObservances[0]?.tithiOrPanchang && (
                  <div className="text-[11px] font-mono text-charcoal-soft bg-ivory-surface p-2 rounded-lg border border-gold/20">
                    Archived Tithi: {historicalOccurrence.regionalObservances[0].tithiOrPanchang}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar Actions & Related Items */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Action Card Maker Callout */}
            <div className="bg-gradient-to-br from-vermilion to-vermilion-800 text-ivory-light p-6 rounded-3xl border border-gold shadow-editorial space-y-4 text-center">
              <DiyaIcon className="w-10 h-10 text-gold mx-auto" />
              <h3 className="font-serif text-xl font-bold">
                Send a Personalized {festival.title[loc]} Card
              </h3>
              <p className="text-xs text-ivory-dark">
                Create and download custom festive greetings instantly with no app download required.
              </p>
              <Link
                href={`/${loc}/studio?festival=${festival.slug}`}
                className="inline-block w-full bg-gold hover:bg-gold-300 text-charcoal font-bold py-3 rounded-xl shadow-md text-xs transition-all"
              >
                Open Celebration Studio →
              </Link>
            </div>

            {/* Sidebar Related Celebrations */}
            <div className="bg-ivory-surface p-6 rounded-3xl border border-gold/40 shadow-xs space-y-4">
              <h4 className="font-serif text-base font-bold text-charcoal uppercase tracking-wider">
                Related Celebrations
              </h4>
              <div className="space-y-3">
                {relatedFestivals.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${loc}/festivals/${rel.slug}`}
                    className="flex items-center space-x-3 p-2.5 rounded-xl border border-gold/20 hover:border-gold hover:bg-gold/10 transition-all group"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-charcoal shrink-0">
                      <Image
                        src={rel.heroImage.url}
                        alt={rel.heroImage.alt}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h5 className="font-serif text-sm font-bold text-charcoal group-hover:text-vermilion transition-colors">
                        {rel.title[loc]}
                      </h5>
                      <span className="text-[10px] text-charcoal-muted uppercase tracking-wider">
                        {rel.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Ad Placement */}
            <RRAdSlot slotId="festival-sidebar" format="rectangle" />
          </div>
        </div>
      </div>
    </article>
  );
}
