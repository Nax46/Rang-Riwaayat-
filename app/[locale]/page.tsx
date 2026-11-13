import React from 'react';
import { Locale } from '../../lib/types';
import { getDictionary } from '../../lib/i18n';
import {
  getFestivals,
  getOccurrences,
  getAllStatesUTs,
  getRecipes,
} from '../../lib/db/store';
import { getCurrentYear, getUpcomingYear, isToday, isUpcoming } from '../../lib/utils/date';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Compass,
  ArrowRight,
  Clock,
  Leaf,
  Palette,
  Gamepad2,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { OrnateBorderHeader } from '../../components/MotifDecoration';
import { FestivalCountdown } from '../../components/FestivalCountdown';
import { RRAdSlot } from '../../components/RRAdSlot';
import { CulturalDispatchForm } from '../../components/CulturalDispatchForm';

export const revalidate = 60;

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

  const todayOcc = currentOccurrences.find((o) => isToday(o.primaryDate));
  let featuredOccurrence = todayOcc;
  let featuredFestival = todayOcc ? festivals.find((f) => f.slug === todayOcc.festivalSlug) : null;

  if (!featuredOccurrence || !featuredFestival) {
    const upcomingOcc = allActiveOccurrences
      .filter((o) => isUpcoming(o.primaryDate))
      .sort((a, b) => new Date(a.primaryDate).getTime() - new Date(b.primaryDate).getTime())[0];

    featuredOccurrence = upcomingOcc || currentOccurrences[0];
    featuredFestival =
      festivals.find((f) => f.slug === featuredOccurrence?.festivalSlug) || festivals[0] || null;
  }

  const featuredDateLabel = featuredOccurrence
    ? new Date(featuredOccurrence.primaryDate).toLocaleDateString(
        loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
        { month: 'long', day: 'numeric', year: 'numeric' }
      )
    : '';

  const copy = {
    featuredCaption:
      loc === 'hi'
        ? 'आगामी प्रमुख पर्व'
        : loc === 'gu'
        ? 'આગામી મુખ્ય પર્વ'
        : 'Upcoming Highlight',
    readDossier:
      loc === 'hi' ? 'पूरा विवरण पढ़ें' : loc === 'gu' ? 'વિગતવાર વાંચો' : 'Read Festival Guide',
    festivalsSubtitle:
      loc === 'hi'
        ? 'राष्ट्रीय पंचांग और प्रामाणिक सांस्कृतिक स्रोतों पर आधारित सत्यापित तिथियाँ व परंपराएँ'
        : loc === 'gu'
        ? 'રાષ્ટ્રીય પંચાંગ અને પ્રમાણિત સાંસ્કૃતિક સ્ત્રોતો પર આધારિત તિથિઓ અને પરંપરાઓ'
        : 'Verified Pan-India dates cross-referenced with astronomical calendars and regional archives',
    viewAllFestivals:
      loc === 'hi'
        ? 'सभी त्योहार व पंचांग अभिलेख देखें'
        : loc === 'gu'
        ? 'બધા તહેવારો અને પંચાંગ અભિલેખ જુઓ'
        : 'Browse All Festival Guides',
    celebratingToday:
      loc === 'hi' ? 'आज का पावन पर्व' : loc === 'gu' ? 'આજનો પાવન અવસર' : 'Celebrating Today',
    pillarsHeading:
      loc === 'hi'
        ? 'संवादात्मक सांस्कृतिक मंच'
        : loc === 'gu'
        ? 'સંવાદાત્મક સાંસ્કૃતિક મંચ'
        : 'Explore Interactive Cultural Archives',
    pillarsSub:
      loc === 'hi'
        ? 'भारत की क्षेत्रीय विरासत, पारंपरिक कलाएँ, ग्रीटिंग कार्ड स्टूडियो और ज्ञानवर्धक प्रश्नोत्तरी'
        : loc === 'gu'
        ? 'ભારતનો પ્રાદેશિક વારસો, લોકકલા, ગ્રીટિંગ કાર્ડ સ્ટુડિયો અને સાંસ્કૃતિક પ્રશ્નોત્તરી'
        : 'Open dedicated tools built for exploring regional geography, greeting design, textiles, and trivia',
    recipesSub:
      loc === 'hi'
        ? 'सामग्री के मात्रा-मापक और चरणबद्ध समय-सूचक के साथ पारंपरिक उत्सव व्यंजन'
        : loc === 'gu'
        ? 'સામગ્રીના માપક અને તબક્કાવાર સમય-સૂચક સાથે પરંપરાગત ઉત્સવ વાનગીઓ'
        : 'Heirloom festive dishes with interactive serving scalers and step timers',
    viewAllRecipes:
      loc === 'hi' ? 'सभी पाक विधियाँ देखें' : loc === 'gu' ? 'બધી વાનગીઓ જુઓ' : 'View All Recipes',
    prepLabel: loc === 'hi' ? 'तैयारी' : loc === 'gu' ? 'તૈયારી' : 'Prep',
    cookLabel: loc === 'hi' ? 'पकाने का समय' : loc === 'gu' ? 'રસોઈ સમય' : 'Cook',
    statFestivals: loc === 'hi' ? 'प्रमुख पर्व' : loc === 'gu' ? 'મુખ્ય તહેવારો' : 'Festivals',
    statStates: loc === 'hi' ? 'राज्य व केंद्र शासित प्रदेश' : loc === 'gu' ? 'રાજ્યો અને પ્રદેશો' : 'States & UTs',
    statRecipes: loc === 'hi' ? 'पारंपरिक व्यंजन' : loc === 'gu' ? 'પરંપરાગત વાનગીઓ' : 'Heirloom Recipes',
  };

  const pillars = [
    {
      href: `/${loc}/explorer`,
      icon: Compass,
      eyebrow:
        loc === 'hi' ? 'क्षेत्रीय एटलस' : loc === 'gu' ? 'પ્રાદેશિક એટલાસ' : 'Regional Atlas',
      title: dict.sections.regionalExplorer,
      desc:
        loc === 'hi'
          ? 'प्रत्येक राज्य के स्थानीय पर्व, लोक व्यंजन और हस्तशिल्प को जानें और डिजिटल पासपोर्ट सहेजें।'
          : loc === 'gu'
          ? 'દરેક રાજ્યના સ્થાનિક તહેવારો, વાનગીઓ અને હસ્તકલાને જાણો તથા ડિજિટલ પાસપોર્ટ સાચવો.'
          : 'Browse harvest customs, regional cuisines, and local observances across every Indian state and union territory.',
      cta: loc === 'hi' ? 'एटलस खोलें' : loc === 'gu' ? 'એટલાસ ખોલો' : 'Open Explorer',
    },
    {
      href: `/${loc}/studio`,
      icon: Palette,
      eyebrow:
        loc === 'hi' ? 'ग्रीटिंग कार्ड स्टूडियो' : loc === 'gu' ? 'કાર્ડ સ્ટુડિયો' : 'Card Studio',
      title: dict.sections.celebrationStudio,
      desc:
        loc === 'hi'
          ? 'हिन्दी, गुजराती और अंग्रेजी में त्योहारों के सुंदर शुभकामना कार्ड सीधे अपने ब्राउज़र में बनाएं।'
          : loc === 'gu'
          ? 'ગુજરાતી, હિન્દી અને અંગ્રેજીમાં તહેવારોના શુભેચ્છા કાર્ડ સીધા તમારા બ્રાઉઝરમાં બનાવો.'
          : 'Compose printable greeting cards with curated multilingual wishes and traditional motifs directly on your device.',
      cta: loc === 'hi' ? 'कार्ड बनाएं' : loc === 'gu' ? 'કાર્ડ બનાવો' : 'Open Studio',
    },
    {
      href: `/${loc}/culture`,
      icon: BookOpen,
      eyebrow:
        loc === 'hi' ? 'हस्तशिल्प और लोक कला' : loc === 'gu' ? 'લોકકલા અને વણાટ' : 'Living Arts',
      title: dict.nav.culture,
      desc:
        loc === 'hi'
          ? 'मधुबनी, काँजीवरम, पटोला, पट्टचित्र और शास्त्रीय कला परंपराओं का प्रामाणिक संग्रह।'
          : loc === 'gu'
          ? 'પાટણના પટોળા, મધુબની, કાંજીવરમ, પટ્ટચિત્ર અને ભારતીય લોકકલાઓનું પ્રમાણિત સંકલન.'
          : 'Discover handloom textiles, folk painting lineages, classical music, and regional craft traditions.',
      cta: loc === 'hi' ? 'कला संग्रह देखें' : loc === 'gu' ? 'કલા સંગ્રહ જુઓ' : 'Explore Culture',
    },
    {
      href: `/${loc}/quiz`,
      icon: Gamepad2,
      eyebrow:
        loc === 'hi' ? 'ज्ञान और खेल क्षेत्र' : loc === 'gu' ? 'સાંસ્કૃતિક ક્વિઝ' : 'Fun Zone',
      title: dict.sections.funZoneTitle,
      desc:
        loc === 'hi'
          ? 'अकेले अभ्यास करें या मित्रों व परिवार के साथ लाइव रूम बनाकर भारतीय संस्कृति प्रश्नोत्तरी खेलें।'
          : loc === 'gu'
          ? 'એકલા અભ્યાસ કરો અથવા મિત્રો અને પરિવાર સાથે લાઇવ રૂમ બનાવી સાંસ્કૃતિક ક્વિઝ રમો.'
          : 'Play solo cultural quizzes or host real-time synchronized trivia rooms with family and friends.',
      cta: loc === 'hi' ? 'प्रश्नोत्तरी शुरू करें' : loc === 'gu' ? 'ક્વિઝ શરૂ કરો' : 'Enter Fun Zone',
    },
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-16 sm:pb-24">
      {/* 1. Asymmetric Editorial Cover Hero */}
      <section className="bg-ivory-surface border-b border-gold/30 py-10 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Editorial Lead */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-vermilion border-b border-gold/60 pb-1.5">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>{dict.hero.badge}</span>
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-serif font-black text-charcoal tracking-tight leading-[1.14]">
                {dict.hero.heading}
              </h1>

              <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl font-sans leading-relaxed">
                {dict.hero.subheading}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href={`/${loc}/festivals`}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-vermilion hover:bg-vermilion-600 text-ivory-light font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-editorial transition-colors"
                >
                  <span>{dict.hero.exploreCta}</span>
                  <ArrowRight className="w-4 h-4 text-gold shrink-0" />
                </Link>
                <Link
                  href={`/${loc}/calendar`}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-ivory-light hover:bg-gold/15 text-charcoal border border-gold/60 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-vermilion shrink-0" />
                  <span>{dict.hero.calendarCta}</span>
                </Link>
              </div>

              {/* Factual Archive Summary */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-gold/25 max-w-lg">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-charcoal tabular-nums">
                    {festivals.length}
                  </div>
                  <div className="text-[11px] sm:text-xs text-charcoal-muted mt-0.5 leading-snug">
                    {copy.statFestivals}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-charcoal tabular-nums">
                    {states.length}
                  </div>
                  <div className="text-[11px] sm:text-xs text-charcoal-muted mt-0.5 leading-snug">
                    {copy.statStates}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-charcoal tabular-nums">
                    {recipes.length}
                  </div>
                  <div className="text-[11px] sm:text-xs text-charcoal-muted mt-0.5 leading-snug">
                    {copy.statRecipes}
                  </div>
                </div>
              </div>
            </div>

            {/* Framed Cover Photograph */}
            {featuredFestival && (
              <div className="lg:col-span-5">
                <Link
                  href={`/${loc}/festivals/${featuredFestival.slug}`}
                  className="group block bg-ivory-light rounded-3xl p-3 border border-gold/40 shadow-editorial-lg hover:border-vermilion/50 transition-all"
                >
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-charcoal">
                    <Image
                      src={featuredFestival.heroImage.url}
                      alt={featuredFestival.heroImage.alt}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-ivory-light space-y-1">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-gold text-charcoal px-2.5 py-0.5 rounded-md">
                        {copy.featuredCaption}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                        {featuredFestival.title[loc]}
                      </h2>
                      {featuredDateLabel && (
                        <p className="text-xs text-ivory-dark flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{featuredDateLabel}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="px-2 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-vermilion">
                    <span className="truncate">{featuredFestival.category}</span>
                    <span className="inline-flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <span>{copy.readDossier}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Live Festival Countdown Banner */}
      {featuredFestival && featuredOccurrence && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FestivalCountdown
            festival={featuredFestival}
            occurrence={featuredOccurrence}
            locale={loc}
          />
        </section>
      )}

      {/* 3. Verified Festivals Directory Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <OrnateBorderHeader
          title={dict.sections.upcomingFestivals}
          subtitle={copy.festivalsSubtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {festivals.slice(0, 6).map((fest) => {
            const currentOcc = currentOccurrences.find((o) => o.festivalSlug === fest.slug);
            const futureOcc = futureOccurrences.find((o) => o.festivalSlug === fest.slug);

            let occ = currentOcc;
            if (currentOcc && isToday(currentOcc.primaryDate)) {
              occ = currentOcc;
            } else if (currentOcc && isUpcoming(currentOcc.primaryDate)) {
              occ = currentOcc;
            } else if (futureOcc) {
              occ = futureOcc;
            }

            const isTodayCard = occ ? isToday(occ.primaryDate) : false;
            const dateStr = occ
              ? new Date(occ.primaryDate).toLocaleDateString(
                  loc === 'hi' ? 'hi-IN' : loc === 'gu' ? 'gu-IN' : 'en-IN',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )
              : '';

            return (
              <article
                key={fest.id}
                className={`group bg-ivory-surface rounded-3xl border ${
                  isTodayCard
                    ? 'border-gold ring-2 ring-gold/50 shadow-editorial-lg'
                    : 'border-gold/35 shadow-editorial'
                } hover:shadow-editorial-lg transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div className="relative h-52 w-full overflow-hidden bg-charcoal">
                  <Image
                    src={fest.heroImage.url}
                    alt={fest.heroImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-ivory-light">
                    <span className="bg-gold text-charcoal font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {fest.category}
                    </span>
                    {isTodayCard ? (
                      <span className="font-bold bg-vermilion text-ivory-light px-2.5 py-1 rounded-md shadow-sm">
                        {copy.celebratingToday}
                      </span>
                    ) : dateStr ? (
                      <span className="font-medium bg-charcoal/85 px-2.5 py-1 rounded-md border border-gold/30 inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{dateStr}</span>
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-vermilion transition-colors">
                      <Link href={`/${loc}/festivals/${fest.slug}`}>{fest.title[loc]}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted mt-2 line-clamp-3 leading-relaxed">
                      {fest.shortSummary[loc]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gold/20 flex items-center justify-between gap-2">
                    <Link
                      href={`/${loc}/festivals/${fest.slug}`}
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-bold text-vermilion hover:text-vermilion-700 transition-colors"
                    >
                      <span>{dict.cards.viewDetails}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-1 text-[11px] text-charcoal-soft truncate">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">{fest.sources[0]?.type || 'Archive'}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href={`/${loc}/festivals`}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-ivory-surface hover:bg-gold/15 text-vermilion border border-vermilion font-semibold px-7 py-3 rounded-xl shadow-xs text-sm transition-colors"
          >
            <span>{copy.viewAllFestivals}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Configurable Safe Ad Placement */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RRAdSlot slotId="home-after-festivals" />
      </div>

      {/* 4. Focused Editorial Doors to Interactive Tools */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <OrnateBorderHeader title={copy.pillarsHeading} subtitle={copy.pillarsSub} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="group bg-ivory-surface rounded-3xl p-6 sm:p-7 border border-gold/40 shadow-editorial hover:border-vermilion/60 hover:shadow-editorial-lg transition-all flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-vermilion">
                      {pillar.eyebrow}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-ivory-light border border-gold/40 flex items-center justify-center text-vermilion group-hover:bg-vermilion group-hover:text-ivory-light transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-vermilion transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-bold text-vermilion">
                  <span>{pillar.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Sacred Prasad & Festive Kitchen */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <OrnateBorderHeader title={dict.sections.culinaryHeritage} subtitle={copy.recipesSub} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {recipes.slice(0, 4).map((recipe) => (
            <article
              key={recipe.id}
              className="bg-ivory-surface rounded-3xl border border-gold/40 p-5 sm:p-7 shadow-editorial hover:shadow-editorial-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs bg-gold/20 text-vermilion font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {recipe.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <Leaf className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{recipe.dietaryType}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  <Link
                    href={`/${loc}/recipes/${recipe.slug}`}
                    className="hover:text-vermilion transition-colors"
                  >
                    {recipe.title[loc]}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-2">
                  {recipe.culturalStory[loc]}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gold/20 text-xs">
                <span className="inline-flex items-center gap-1.5 text-charcoal-muted">
                  <Clock className="w-3.5 h-3.5 text-vermilion shrink-0" />
                  <span>
                    {copy.prepLabel}: {recipe.prepTimeMinutes}m · {copy.cookLabel}:{' '}
                    {recipe.cookTimeMinutes}m
                  </span>
                </span>
                <Link
                  href={`/${loc}/recipes/${recipe.slug}`}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-300 text-charcoal font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
                >
                  <span>{dict.cards.viewRecipe}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center pt-1">
          <Link
            href={`/${loc}/recipes`}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] text-sm font-semibold text-vermilion hover:text-vermilion-700 underline underline-offset-4"
          >
            <span>{copy.viewAllRecipes}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Real Working Seasonal Almanac Dispatch */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CulturalDispatchForm locale={loc} />
      </section>
    </div>
  );
}
