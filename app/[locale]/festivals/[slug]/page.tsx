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
  Flame,
  ScrollText,
} from 'lucide-react';
import { DiyaIcon, MandalaIcon, OrnateBorderHeader } from '../../../../components/MotifDecoration';
import { RRAdSlot } from '../../../../components/RRAdSlot';
import { SacredChantsPlayer } from '../../../../components/SacredChantsPlayer';
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
    : loc === 'hi'
      ? 'वार्षिक पर्व'
      : loc === 'gu'
      ? 'વાર્ષિક પર્વ'
      : 'Annual Observance';

  const labels = {
    verifiedPrefix: loc === 'hi' ? 'सत्यापित:' : loc === 'gu' ? 'પ્રમાણિત:' : 'Verified:',
    astronomicalObs:
      loc === 'hi'
        ? 'खगोलीय एवं तिथि विवरण'
        : loc === 'gu'
        ? 'ખગોળીય અને તિથિ વિગત'
        : 'Astronomical & Tithi Observance',
    celebratingToday:
      loc === 'hi' ? 'आज का पावन पर्व' : loc === 'gu' ? 'આજનો પાવન અવસર' : 'Celebrating Today',
    panchangTithi:
      loc === 'hi' ? 'पंचांग तिथि:' : loc === 'gu' ? 'પંચાંગ તિથિ:' : 'Panchang Tithi:',
    verifiedMuhurat:
      loc === 'hi' ? 'प्रमाणित मुहूर्त:' : loc === 'gu' ? 'પ્રમાણિત મુહૂર્ત:' : 'Verified Muhurat:',
    upcomingIn:
      loc === 'hi' ? 'आगामी वर्ष' : loc === 'gu' ? 'આગામી વર્ષ' : 'Upcoming in',
    whyCelebrated:
      loc === 'hi'
        ? 'यह पर्व क्यों मनाया जाता है'
        : loc === 'gu'
        ? 'આ પર્વ કેમ ઉજવવામાં આવે છે'
        : 'Why It Is Celebrated',
    historyTitle:
      loc === 'hi'
        ? 'इतिहास और सांस्कृतिक महत्व'
        : loc === 'gu'
        ? 'ઇતિહાસ અને સાંસ્કૃતિક મહત્વ'
        : 'History & Cultural Significance',
    regionalTitle:
      loc === 'hi'
        ? 'क्षेत्रीय परंपराएं और विविधताएं'
        : loc === 'gu'
        ? 'પ્રાદેશિક પરંપરાઓ અને વિવિધતા'
        : 'Regional Traditions & Variations',
    ritualsTitle:
      loc === 'hi'
        ? 'पूजा विधि और पारंपरिक अनुष्ठान'
        : loc === 'gu'
        ? 'પૂજા વિધિ અને પરંપરાગત અનુષ્ઠાન'
        : 'Rituals & Sacred Customs',
    delicaciesTitle:
      loc === 'hi'
        ? 'पारंपरिक उत्सव व्यंजन'
        : loc === 'gu'
        ? 'પરંપરાગત ઉત્સવ વાનગીઓ'
        : 'Associated Festive Delicacies',
    viewRecipeBtn:
      loc === 'hi'
        ? 'पूरी पाक विधि और टाइमर देखें'
        : loc === 'gu'
        ? 'સંપૂર્ણ વાનગી અને ટાઇમર જુઓ'
        : 'View Interactive Recipe & Timers',
    decorTitle:
      loc === 'hi'
        ? 'गृह सज्जा और रंगोली परंपरा'
        : loc === 'gu'
        ? 'ગૃહ સજાવટ અને રંગોળી પરંપરા'
        : 'Traditional Home Decor & Rangoli',
    faqTitle:
      loc === 'hi'
        ? 'प्रायः पूछे जाने वाले प्रश्न'
        : loc === 'gu'
        ? 'વારંવાર પૂછાતા પ્રશ્નો'
        : 'Frequently Asked Questions',
    sourcesTitle:
      loc === 'hi'
        ? 'प्रामाणिक संस्थानिक संदर्भ'
        : loc === 'gu'
        ? 'પ્રમાણિત સંસ્થાકીય સંદર્ભો'
        : 'Verified Primary Institutional Sources',
    archiveLink:
      loc === 'hi' ? 'संदर्भ लिंक' : loc === 'gu' ? 'સંદર્ભ લિંક' : 'Archive Link',
    lastVerified:
      loc === 'hi' ? 'अंतिम सत्यापन:' : loc === 'gu' ? 'અંતિમ ચકાસણી:' : 'Last verified:',
    reportNuance:
      loc === 'hi'
        ? 'तथ्य या क्षेत्रीय परंपरा साझा करें'
        : loc === 'gu'
        ? 'નોંધ કે પ્રાદેશિક વિગત સુચવો'
        : 'Report Observation / Suggest Nuance',
    historicalTitle:
      loc === 'hi'
        ? 'ऐतिहासिक अभिलेख (2025)'
        : loc === 'gu'
        ? 'ઐતિહાસિક અભિલેખ (2025)'
        : 'Historical Observance Archive (2025)',
    historicalBodyPrefix:
      loc === 'hi' ? 'वर्ष 2025 में ' : loc === 'gu' ? 'વર્ષ 2025 માં ' : 'In 2025, ',
    historicalBodyMid:
      loc === 'hi' ? ' मनाया गया था: ' : loc === 'gu' ? ' ઉજવાયો હતો: ' : ' was observed on ',
    historicalBodySuffix:
      loc === 'hi'
        ? '। यह अभिलेख सांस्कृतिक और ऐतिहासिक तुलना हेतु सुरक्षित रखा गया है।'
        : loc === 'gu'
        ? '. આ નોંધ સાંસ્કૃતિક અને ઐતિહાસિક તુલના માટે જાળવવામાં આવી છે.'
        : '. This record is maintained for cultural, astrological, and comparative historical documentation.',
    archivedTithi:
      loc === 'hi' ? 'अभिलेखित तिथि:' : loc === 'gu' ? 'નોંધાયેલ તિથિ:' : 'Archived Tithi:',
    sendCardHeading:
      loc === 'hi'
        ? `विशेष ${festival.title[loc]} शुभकामना कार्ड भेजें`
        : loc === 'gu'
        ? `ખાસ ${festival.title[loc]} શુભેચ્છા કાર્ડ મોકલો`
        : `Send a Personalized ${festival.title[loc]} Card`,
    sendCardDesc:
      loc === 'hi'
        ? 'बिना किसी ऐप के सीधे अपने ब्राउज़र में मुद्रण योग्य शुभकामना कार्ड तैयार करें।'
        : loc === 'gu'
        ? 'કોઈ એપ વગર સીધા બ્રાઉઝરમાં જ સુંદર શુભેચ્છા કાર્ડ બનાવો અને ડાઉનલોડ કરો.'
        : 'Create and download custom festive greetings instantly directly in your browser.',
    openStudioBtn:
      loc === 'hi'
        ? 'कार्ड स्टूडियो खोलें'
        : loc === 'gu'
        ? 'કાર્ડ સ્ટુડિયો ખોલો'
        : 'Open Celebration Studio',
    relatedTitle:
      loc === 'hi'
        ? 'अन्य प्रमुख पर्व'
        : loc === 'gu'
        ? 'અન્ય મુખ્ય તહેવારો'
        : 'Related Celebrations',
  };

  return (
    <article className="pb-24">
      {/* 1. Hero Image & Title Banner */}
      <div className="relative min-h-[360px] sm:min-h-[460px] flex items-end w-full bg-charcoal overflow-hidden border-b-4 border-gold">
        <Image
          src={festival.heroImage.url}
          alt={festival.heroImage.alt}
          fill
          priority
          className="object-cover opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/15" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pb-12 relative z-10 text-ivory-light">
          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gold text-charcoal font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {festival.category}
              </span>
              <span className="bg-vermilion/90 border border-gold/40 text-ivory-light text-xs px-3 py-1 rounded-full font-medium">
                {festival.communities.join(' · ')}
              </span>
              <span className="bg-charcoal/80 text-ivory-dark text-xs px-3 py-1 rounded-full border border-gold/30">
                {labels.verifiedPrefix} {festival.lastVerifiedDate}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-ivory-surface tracking-tight leading-[1.14]">
              {festival.title[loc]}
            </h1>

            <p className="text-sm sm:text-base text-ivory-dark font-sans leading-relaxed max-w-2xl">
              {festival.shortSummary[loc]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Main Editorial Body */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* Verified Date & Muhurat Card */}
            {occurrence && (
              <div className="space-y-4">
                <div className={`bg-gradient-to-br from-gold/15 via-ivory-light to-ivory-surface p-5 sm:p-6 rounded-3xl border ${
                  isToday(occurrence.primaryDate) ? 'border-gold ring-2 ring-gold/60 shadow-editorial-lg' : 'border-gold/50 shadow-xs'
                } space-y-3`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-vermilion font-bold text-xs uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-gold shrink-0" />
                      <span>{occurrence.year} · {labels.astronomicalObs}</span>
                    </div>
                    {isToday(occurrence.primaryDate) && (
                      <span className="bg-vermilion text-ivory-light text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center space-x-1.5">
                        <Flame className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{labels.celebratingToday}</span>
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {primaryDateFormatted}
                  </div>
                  {occurrence.regionalObservances[0]?.tithiOrPanchang && (
                    <p className="text-xs sm:text-sm text-charcoal-muted font-sans flex items-start gap-2">
                      <ScrollText className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>
                        <strong>{labels.panchangTithi}</strong> {occurrence.regionalObservances[0].tithiOrPanchang}
                      </span>
                    </p>
                  )}
                  {occurrence.regionalObservances[0]?.muhuratVerified && (
                    <p className="text-xs sm:text-sm text-vermilion font-sans font-semibold flex items-start gap-2">
                      <Clock className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                      <span>
                        <strong>{labels.verifiedMuhurat}</strong> {occurrence.regionalObservances[0].muhuratVerified}
                      </span>
                    </p>
                  )}
                </div>

                {/* Upcoming Future Observance Preview (2027) */}
                {futureOccurrence && (
                  <div className="bg-ivory-surface p-4 rounded-2xl border border-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <Clock className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-charcoal-muted font-medium">
                        {labels.upcomingIn} {futureOccurrence.year}:
                      </span>
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
                <DiyaIcon className="w-5 h-5 text-gold shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  {labels.whyCelebrated}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line bg-ivory-surface p-5 sm:p-6 rounded-2xl border border-gold/20">
                {festival.whyCelebrated[loc]}
              </p>
            </section>

            {/* History and Significance */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gold shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  {labels.historyTitle}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line bg-ivory-surface p-5 sm:p-6 rounded-2xl border border-gold/20">
                {festival.historyAndSignificance[loc]}
              </p>
            </section>

            {/* Ad Placement between long editorial sections */}
            <RRAdSlot slotId="festival-body-mid" />

            {/* Regional Observances and Variations */}
            {occurrence && occurrence.regionalObservances.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gold shrink-0" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {labels.regionalTitle}
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
                <Sparkles className="w-5 h-5 text-gold shrink-0" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  {labels.ritualsTitle}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-line bg-ivory-surface p-5 sm:p-6 rounded-2xl border border-gold/20">
                {festival.ritualsAndCustoms[loc]}
              </p>
            </section>

            {/* Sacred Chant, Mantra & Folk Text Player */}
            <SacredChantsPlayer festivalSlug={festival.slug} locale={loc} />

            {/* Traditional Food & Festive Recipes */}
            {relatedRecipes.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-gold shrink-0" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {labels.delicaciesTitle}
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
                        className="inline-flex items-center space-x-1 min-h-[44px] text-xs font-bold text-vermilion hover:underline pt-1"
                      >
                        <span>{labels.viewRecipeBtn}</span>
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
                  <Palette className="w-5 h-5 text-gold shrink-0" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {labels.decorTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {festival.decorationIdeas[loc].map((idea, idx) => (
                    <div
                      key={idx}
                      className="bg-ivory-light p-4 rounded-xl border border-gold/30 text-xs sm:text-sm text-charcoal flex items-start space-x-2.5"
                    >
                      <span className="text-gold font-bold" aria-hidden="true">*</span>
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
                  <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {labels.faqTitle}
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
            <section className="bg-ivory-light p-5 sm:p-6 rounded-3xl border border-gold/40 space-y-3">
              <div className="flex items-center space-x-2 text-charcoal font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>{labels.sourcesTitle}</span>
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
                        <span>{labels.archiveLink}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] text-charcoal-soft flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>{labels.lastVerified} {festival.lastVerifiedDate}</span>
                <Link
                  href={`/${loc}/corrections`}
                  className="text-vermilion hover:underline font-semibold inline-flex items-center min-h-[36px]"
                >
                  {labels.reportNuance} &rarr;
                </Link>
              </div>
            </section>

            {/* Historical Observance Archive (2025) */}
            {historicalOccurrence && (
              <section className="bg-charcoal/5 p-5 sm:p-6 rounded-3xl border border-charcoal/20 space-y-3">
                <div className="flex items-center space-x-2 text-charcoal font-bold text-xs uppercase tracking-wider">
                  <History className="w-4 h-4 text-gold shrink-0" />
                  <span>{labels.historicalTitle}</span>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {labels.historicalBodyPrefix}
                  {festival.title[loc]}
                  {labels.historicalBodyMid}
                  <strong className="text-charcoal font-semibold">
                    {new Date(historicalOccurrence.primaryDate).toLocaleDateString(
                      loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
                      { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
                    )}
                  </strong>
                  {labels.historicalBodySuffix}
                </p>
                {historicalOccurrence.regionalObservances[0]?.tithiOrPanchang && (
                  <div className="text-[11px] font-mono text-charcoal-soft bg-ivory-surface p-2 rounded-lg border border-gold/20">
                    {labels.archivedTithi} {historicalOccurrence.regionalObservances[0].tithiOrPanchang}
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
                {labels.sendCardHeading}
              </h3>
              <p className="text-xs text-ivory-dark">
                {labels.sendCardDesc}
              </p>
              <Link
                href={`/${loc}/studio?festival=${festival.slug}`}
                className="inline-flex items-center justify-center w-full min-h-[48px] bg-gold hover:bg-gold-300 text-charcoal font-bold py-3 rounded-xl shadow-md text-xs transition-all"
              >
                {labels.openStudioBtn} &rarr;
              </Link>
            </div>

            {/* Sidebar Related Celebrations */}
            <div className="bg-ivory-surface p-6 rounded-3xl border border-gold/40 shadow-xs space-y-4">
              <h4 className="font-serif text-base font-bold text-charcoal uppercase tracking-wider">
                {labels.relatedTitle}
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
