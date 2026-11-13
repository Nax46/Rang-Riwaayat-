'use client';

import React, { useState, useMemo } from 'react';
import { Festival, FestivalOccurrence, Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Download,
  Filter,
  Grid,
  List,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Flame,
  Clock,
  History,
  Moon
} from 'lucide-react';
import { DiyaIcon } from './MotifDecoration';
import {
  getCurrentYear,
  getUpcomingYear,
  isToday,
  isNext7Days,
  isThisMonth,
  isUpcoming
} from '../lib/utils/date';

interface CalendarProps {
  festivals: Festival[];
  occurrences: FestivalOccurrence[];
  locale: Locale;
}

export function InteractiveFestivalCalendar({ festivals, occurrences, locale }: CalendarProps) {
  const dict = getDictionary(locale);
  const currentSysYear = getCurrentYear();
  const upcomingSysYear = getUpcomingYear();

  const [selectedYear, setSelectedYear] = useState<number>(currentSysYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1-12, 0 = All
  const [selectedCommunity, setSelectedCommunity] = useState<string>('All');
  const [timeframe, setTimeframe] = useState<'all' | 'today' | 'next7' | 'thisMonth'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const months = [
    { num: 0, name: { en: 'All Months', hi: 'सभी माह', gu: 'બધા મહિના' } },
    { num: 1, name: { en: 'January', hi: 'जनवरी', gu: 'જાન્યુઆરી' } },
    { num: 2, name: { en: 'February', hi: 'फ़रवरी', gu: 'ફેબ્રુઆરી' } },
    { num: 3, name: { en: 'March', hi: 'मार्च', gu: 'માર્ચ' } },
    { num: 4, name: { en: 'April', hi: 'अप्रैल', gu: 'એપ્રિલ' } },
    { num: 5, name: { en: 'May', hi: 'मई', gu: 'મે' } },
    { num: 6, name: { en: 'June', hi: 'जून', gu: 'જૂન' } },
    { num: 7, name: { en: 'July', hi: 'जुलाई', gu: 'જુલાઈ' } },
    { num: 8, name: { en: 'August', hi: 'अगस्त', gu: 'ઓગસ્ટ' } },
    { num: 9, name: { en: 'September', hi: 'सितंबर', gu: 'સપ્ટેમ્બર' } },
    { num: 10, name: { en: 'October', hi: 'अक्टूबर', gu: 'ઓક્ટોબર' } },
    { num: 11, name: { en: 'November', hi: 'नवंबर', gu: 'નવેમ્બર' } },
    { num: 12, name: { en: 'December', hi: 'दिसंबर', gu: 'ડિસેમ્બર' } },
  ];

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

  // Filter occurrences by year, timeframe, month, and community
  const calendarItems = useMemo(() => {
    return occurrences
      .filter((occ) => occ.year === selectedYear)
      .map((occ) => {
        const fest = festivals.find((f) => f.slug === occ.festivalSlug);
        return { occurrence: occ, festival: fest };
      })
      .filter((item): item is { occurrence: FestivalOccurrence; festival: Festival } => !!item.festival)
      .filter((item) => {
        // Community filter
        if (selectedCommunity !== 'All' && !item.festival.communities.includes(selectedCommunity as any)) {
          return false;
        }

        // Timeframe filter (operates on current calendar)
        if (timeframe === 'today') {
          return isToday(item.occurrence.primaryDate);
        }
        if (timeframe === 'next7') {
          return isNext7Days(item.occurrence.primaryDate);
        }
        if (timeframe === 'thisMonth') {
          return isThisMonth(item.occurrence.primaryDate);
        }

        // Month filter
        if (selectedMonth !== 0) {
          const itemMonth = new Date(item.occurrence.primaryDate).getMonth() + 1;
          if (itemMonth !== selectedMonth) return false;
        }

        return true;
      })
      .sort((a, b) => a.occurrence.primaryDate.localeCompare(b.occurrence.primaryDate));
  }, [occurrences, festivals, selectedYear, selectedMonth, selectedCommunity, timeframe]);

  // Client-side ICS Generator (RFC 5545 standard)
  const downloadIcs = (item: { occurrence: FestivalOccurrence; festival: Festival }) => {
    const startStr = item.occurrence.startDate.replace(/-/g, '');
    const endStr = item.occurrence.endDate.replace(/-/g, '');
    const summary = item.festival.title.en;
    const description = item.festival.shortSummary.en.replace(/\n/g, ' ');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Rang and Riwaayat//Cultural Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${item.occurrence.id}@rangriwaayat.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${startStr}`,
      `DTEND;VALUE=DATE:${endStr}`,
      `SUMMARY:${summary} - Rang & Riwaayat (${item.occurrence.year})`,
      `DESCRIPTION:${description}`,
      'LOCATION:India',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${item.festival.slug}-${item.occurrence.year}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarUrl = (item: { occurrence: FestivalOccurrence; festival: Festival }) => {
    const start = item.occurrence.startDate.replace(/-/g, '');
    const end = item.occurrence.endDate.replace(/-/g, '');
    const title = encodeURIComponent(`${item.festival.title[locale]} (${item.occurrence.year}) - Rang & Riwaayat`);
    const details = encodeURIComponent(item.festival.shortSummary[locale]);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=India`;
  };

  const calLabels = {
    allYear: locale === 'hi' ? 'संपूर्ण वर्ष' : locale === 'gu' ? 'સમગ્ર વર્ષ' : 'All Year',
    currentTag: locale === 'hi' ? 'वर्तमान' : locale === 'gu' ? 'વર્તમાન' : 'Current',
    upcomingTag: locale === 'hi' ? 'आगामी' : locale === 'gu' ? 'આગામી' : 'Upcoming',
    archiveTag: locale === 'hi' ? 'अभिलेख' : locale === 'gu' ? 'અભિલેખ' : 'Archive',
    timeframeLabel: locale === 'hi' ? 'अवधि:' : locale === 'gu' ? 'સમયગાળો:' : 'Timeframe:',
    allFestivals: locale === 'hi' ? `सभी ${currentSysYear} पर्व` : locale === 'gu' ? `બધા ${currentSysYear} તહેવારો` : `All ${currentSysYear}`,
    todayFestivals: locale === 'hi' ? 'आज के पर्व' : locale === 'gu' ? 'આજના તહેવારો' : 'Today',
    next7: locale === 'hi' ? 'आगामी 7 दिन' : locale === 'gu' ? 'આગામી 7 દિવસ' : 'Next 7 Days',
    thisMonth: locale === 'hi' ? 'इस माह' : locale === 'gu' ? 'આ મહિને' : 'This Month',
    communityLabel: locale === 'hi' ? 'समुदाय:' : locale === 'gu' ? 'પરંપરા:' : 'Community:',
    todayBadge: locale === 'hi' ? 'आज का पर्व' : locale === 'gu' ? 'આજનો અવસર' : 'Today',
    celebratingTodayBadge: locale === 'hi' ? 'आज का पावन पर्व' : locale === 'gu' ? 'આજનો પાવન અવસર' : 'Celebrating Today',
  };

  return (
    <div className="bg-ivory-surface rounded-3xl p-4 sm:p-8 border border-gold/40 shadow-editorial space-y-6 sm:space-y-8">
      {/* 1. Year Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between pb-5 border-b border-gold/20 gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center space-x-2 text-vermilion text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4 text-gold shrink-0" />
            <span>{dict.calendar.title}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {selectedMonth === 0 ? calLabels.allYear : months.find((m) => m.num === selectedMonth)?.name[locale]} {selectedYear}
          </h3>
          <p className="text-xs text-charcoal-muted mt-1">{dict.calendar.subtitle}</p>
        </div>

        {/* Year Pills (Current, Upcoming, Historical Archive) */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto bg-ivory-light border border-gold/40 rounded-2xl p-1.5 shadow-xs">
          <button
            type="button"
            onClick={() => { setSelectedYear(currentSysYear); setTimeframe('all'); }}
            className={`flex-1 sm:flex-initial min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
              selectedYear === currentSysYear
                ? 'bg-vermilion text-ivory-light shadow-sm'
                : 'text-charcoal hover:bg-gold/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{currentSysYear} ({calLabels.currentTag})</span>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedYear(upcomingSysYear); setTimeframe('all'); }}
            className={`flex-1 sm:flex-initial min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
              selectedYear === upcomingSysYear
                ? 'bg-vermilion text-ivory-light shadow-sm'
                : 'text-charcoal hover:bg-gold/15'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{upcomingSysYear} ({calLabels.upcomingTag})</span>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedYear(2025); setTimeframe('all'); }}
            className={`flex-1 sm:flex-initial min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
              selectedYear === 2025
                ? 'bg-charcoal text-ivory-light shadow-sm'
                : 'text-charcoal-muted hover:bg-gold/15'
            }`}
          >
            <History className="w-3.5 h-3.5 shrink-0" />
            <span>2025 ({calLabels.archiveTag})</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-ivory-light border border-gold/40 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid' ? 'bg-vermilion text-ivory-light shadow-xs' : 'text-charcoal'
            }`}
            title="Grid View"
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
              viewMode === 'list' ? 'bg-vermilion text-ivory-light shadow-xs' : 'text-charcoal'
            }`}
            title="List View"
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Quick Timeframe Filter Chips (Applicable for Current Year) */}
      {selectedYear === currentSysYear && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-ivory-light/80 rounded-2xl border border-gold/30">
          <span className="text-[11px] font-bold text-charcoal-muted uppercase mr-1 flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-vermilion" />
            <span>{calLabels.timeframeLabel}</span>
          </span>
          {[
            { id: 'all', label: calLabels.allFestivals },
            { id: 'today', label: calLabels.todayFestivals },
            { id: 'next7', label: calLabels.next7 },
            { id: 'thisMonth', label: calLabels.thisMonth },
          ].map((tf) => (
            <button
              type="button"
              key={tf.id}
              onClick={() => {
                setTimeframe(tf.id as any);
                if (tf.id !== 'all') setSelectedMonth(0);
              }}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                timeframe === tf.id
                  ? 'bg-vermilion text-ivory-light shadow-xs'
                  : 'bg-ivory hover:bg-gold/20 text-charcoal border border-gold/30'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      )}

      {/* Historical Archive Notice if 2025 selected */}
      {selectedYear === 2025 && (
        <div className="p-4 bg-charcoal/5 border border-charcoal/20 rounded-2xl flex items-center space-x-3 text-xs text-charcoal-muted">
          <History className="w-5 h-5 text-gold shrink-0" />
          <div>
            <strong className="text-charcoal">Historical Observance Archive:</strong> You are viewing verified historical festival records for 2025. These are preserved for academic, cultural, and comparative documentation.
          </div>
        </div>
      )}

      {/* 3. Month Selector Pills */}
      {timeframe === 'all' && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-1 no-scrollbar touch-pan-x">
          {months.map((m) => (
            <button
              key={m.num}
              onClick={() => setSelectedMonth(m.num)}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-medium shrink-0 transition-all flex items-center justify-center ${
                selectedMonth === m.num
                  ? 'bg-vermilion text-ivory-light font-bold shadow-sm'
                  : 'bg-ivory-light hover:bg-gold/15 text-charcoal border border-gold/30'
              }`}
            >
              {m.name[locale]}
            </button>
          ))}
        </div>
      )}

      {/* 4. Community Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-charcoal-muted uppercase mr-1">{calLabels.communityLabel}</span>
        {communities.map((comm) => (
          <button
            type="button"
            key={comm}
            onClick={() => setSelectedCommunity(comm)}
            className={`px-3.5 py-2 min-h-[40px] rounded-full text-xs font-medium transition-all ${
              selectedCommunity === comm
                ? 'bg-gold text-charcoal font-bold shadow-xs'
                : 'bg-ivory-light hover:bg-gold/15 text-charcoal border border-gold/30'
            }`}
          >
            {comm}
          </button>
        ))}
      </div>

      {/* 5. Calendar Items Results */}
      {calendarItems.length === 0 ? (
        <div className="text-center py-12 bg-ivory-light rounded-2xl border border-gold/30">
          <DiyaIcon className="w-12 h-12 text-gold/40 mx-auto mb-3" />
          <h4 className="font-serif text-lg font-bold text-charcoal">
            {dict.cards.emptyFestivalsTitle}
          </h4>
          <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto">
            No celebrations found matching the selected filters for {selectedYear}. Try switching the month or timeframe.
          </p>
          <button
            onClick={() => { setSelectedMonth(0); setSelectedCommunity('All'); setTimeframe('all'); }}
            className="mt-4 px-4 py-2 bg-vermilion text-ivory-light rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calendarItems.map(({ festival, occurrence }) => {
            const isTodayItem = isToday(occurrence.primaryDate);
            const dateObj = new Date(occurrence.primaryDate);
            const dayFormatted = dateObj.toLocaleDateString(
              locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN',
              { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
            );

            return (
              <div
                key={occurrence.id}
                className={`bg-ivory-light rounded-2xl border ${
                  isTodayItem ? 'border-gold ring-2 ring-gold/60 shadow-editorial-lg' : 'border-gold/40 shadow-xs hover:shadow-editorial'
                } p-5 transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="bg-gold/20 text-vermilion text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                      {festival.category}
                    </span>
                    {isTodayItem ? (
                      <span className="bg-vermilion text-ivory-light text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {calLabels.todayBadge}
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-charcoal">
                        {dayFormatted}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-xl font-bold text-charcoal hover:text-vermilion transition-colors">
                    <Link href={`/${locale}/festivals/${festival.slug}`}>
                      {festival.title[locale]}
                    </Link>
                  </h4>

                  <p className="text-xs text-charcoal-muted mt-2 line-clamp-3 leading-relaxed">
                    {festival.shortSummary[locale]}
                  </p>

                  {/* Verification & Astronomical Notes */}
                  <div className="mt-3 space-y-1.5">
                    {occurrence.regionalObservances[0]?.tithiOrPanchang && (
                      <div className="bg-ivory-surface p-2.5 rounded-lg border border-gold/20 text-[11px] text-charcoal-muted flex items-start gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{occurrence.regionalObservances[0].tithiOrPanchang}</span>
                      </div>
                    )}
                    {occurrence.regionalObservances[0]?.muhuratVerified && (
                      <div className="bg-gold/10 p-2.5 rounded-lg border border-gold/30 text-[11px] text-charcoal font-medium flex items-start gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                        <span>{occurrence.regionalObservances[0].muhuratVerified}</span>
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {occurrence.isVerified && (
                      <span className="inline-flex items-center space-x-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified Panchang</span>
                      </span>
                    )}
                    {festival.slug === 'eid-ul-fitr' && (
                      <span className="inline-flex items-center space-x-1 text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-md font-semibold">
                        <Moon className="w-3 h-3 text-sky-600" />
                        <span>Moon Sighting Dependent</span>
                      </span>
                    )}
                    {occurrence.isHistorical && (
                      <span className="inline-flex items-center space-x-1 text-[10px] bg-charcoal/10 text-charcoal border border-charcoal/20 px-2 py-0.5 rounded-md">
                        <History className="w-3 h-3" />
                        <span>Historical Record</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gold/20 flex items-center justify-between gap-2">
                  <Link
                    href={`/${locale}/festivals/${festival.slug}`}
                    className="inline-flex items-center min-h-[44px] text-xs font-bold text-vermilion hover:underline"
                  >
                    {dict.cards.viewDetails} &rarr;
                  </Link>

                  <div className="flex items-center space-x-2">
                    <a
                      href={getGoogleCalendarUrl({ festival, occurrence })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-ivory hover:bg-gold/20 border border-gold/40 rounded-lg text-charcoal text-xs font-medium"
                      title={`Add ${occurrence.year} observance to Google Calendar`}
                      aria-label={`Add ${occurrence.year} observance to Google Calendar`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadIcs({ festival, occurrence })}
                      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-ivory hover:bg-gold/20 border border-gold/40 rounded-lg text-charcoal text-xs font-medium"
                      title={`Download ${occurrence.year} .ICS file`}
                      aria-label={`Download ${occurrence.year} .ICS file`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {calendarItems.map(({ festival, occurrence }) => {
            const isTodayItem = isToday(occurrence.primaryDate);
            const dateObj = new Date(occurrence.primaryDate);
            const dayFormatted = dateObj.toLocaleDateString(
              locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN',
              { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }
            );

            return (
              <div
                key={occurrence.id}
                className={`bg-ivory-light rounded-2xl border ${
                  isTodayItem ? 'border-gold ring-2 ring-gold/50 shadow-md' : 'border-gold/30'
                } p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start space-x-4 min-w-0">
                  <div className={`w-14 h-14 rounded-xl ${isTodayItem ? 'bg-vermilion text-ivory-light' : 'bg-vermilion/10 text-charcoal'} border border-gold/40 flex flex-col items-center justify-center text-center shrink-0`}>
                    <span className={`text-[10px] uppercase font-bold ${isTodayItem ? 'text-ivory-light' : 'text-vermilion'}`}>
                      {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="font-serif text-lg font-black leading-none">
                      {dateObj.getDate()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-serif text-lg font-bold text-charcoal hover:text-vermilion transition-colors">
                        <Link href={`/${locale}/festivals/${festival.slug}`}>
                          {festival.title[locale]}
                        </Link>
                      </h4>
                      {isTodayItem && (
                        <span className="bg-vermilion text-ivory-light text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {calLabels.celebratingTodayBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-muted line-clamp-1">{festival.shortSummary[locale]}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-charcoal-soft">
                      <span>{dayFormatted}</span>
                      <span>•</span>
                      <span>{occurrence.regionalObservances[0]?.regionOrState || 'Pan-India'}</span>
                      {occurrence.regionalObservances[0]?.tithiOrPanchang && (
                        <>
                          <span>•</span>
                          <span className="text-vermilion font-medium">{occurrence.regionalObservances[0].tithiOrPanchang}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
                  <a
                    href={getGoogleCalendarUrl({ festival, occurrence })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial min-h-[44px] inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-lg border border-gold/40 text-xs font-semibold hover:bg-gold/15"
                  >
                    <span>Google Cal</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadIcs({ festival, occurrence })}
                    className="flex-1 sm:flex-initial min-h-[44px] inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-vermilion text-ivory-light text-xs font-semibold hover:bg-vermilion-600 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ICS</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
