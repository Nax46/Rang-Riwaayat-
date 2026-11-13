'use client';

import React, { useState, useEffect } from 'react';
import { Festival, FestivalOccurrence, Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { DiyaIcon } from './MotifDecoration';
import { isToday, isUpcoming } from '../lib/utils/date';

interface CountdownProps {
  festival: Festival;
  occurrence: FestivalOccurrence;
  locale: Locale;
}

export function FestivalCountdown({ festival, occurrence, locale }: CountdownProps) {
  const dict = getDictionary(locale);
  const isTodayFest = isToday(occurrence.primaryDate) || 
    (Boolean(occurrence.startDate) && Boolean(occurrence.endDate) && 
     new Date() >= new Date(`${occurrence.startDate}T00:00:00`) && 
     new Date() <= new Date(`${occurrence.endDate}T23:59:59`));

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    function calculate() {
      const target = new Date(`${occurrence.primaryDate}T00:00:00+05:30`).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [occurrence.primaryDate]);

  const formattedDate = new Date(occurrence.primaryDate).toLocaleDateString(
    locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );

  return (
    <div className="bg-gradient-to-br from-vermilion via-vermilion-700 to-vermilion-800 text-ivory-light rounded-2xl p-5 sm:p-8 shadow-editorial-lg border border-gold/40 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
        <DiyaIcon className="w-80 h-80 text-gold" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          {isTodayFest ? (
            <div className="inline-flex items-center space-x-2 bg-gold text-charcoal px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-vermilion shrink-0" />
              <span>
                {locale === 'hi' ? 'आज का पावन पर्व' : locale === 'gu' ? 'આજનો પાવન અવસર' : 'Celebrating Today'}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 bg-gold/20 border border-gold/40 px-3 py-1 rounded-full text-gold-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>
                {locale === 'hi' ? 'आगामी पर्व उल्टी गिनती' : locale === 'gu' ? 'આગામી પર્વ કાઉન્ટડાઉન' : `Upcoming Observance Countdown • ${occurrence.year}`}
              </span>
            </div>
          )}

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-surface">
            {festival.title[locale]}
          </h3>
          <p className="text-xs sm:text-sm text-ivory-dark flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gold inline" />
              <span>{formattedDate}</span>
            </span>
            <span className="text-gold/60">•</span>
            <span>{occurrence.regionalObservances[0]?.tithiOrPanchang || 'Verified Observance'}</span>
            {occurrence.regionalObservances[0]?.muhuratVerified && (
              <>
                <span className="text-gold/60">•</span>
                <span className="text-gold-300 font-medium">{occurrence.regionalObservances[0].muhuratVerified}</span>
              </>
            )}
          </p>
        </div>

        {/* Counter Units or Celebrating Today Badge */}
        {isTodayFest ? (
          <div className="flex items-center space-x-3 bg-charcoal/60 border border-gold/40 rounded-xl px-4 py-3 text-center">
            <Flame className="w-7 h-7 text-gold animate-bounce" />
            <div className="text-left">
              <div className="text-xs text-gold font-bold uppercase tracking-wide">
                {locale === 'hi' ? 'शुभ मुहूर्त एवं परंपरा' : locale === 'gu' ? 'શુભ મુહૂર્ત અને વિધિ' : 'Auspicious Muhurat Active'}
              </div>
              <div className="text-sm font-semibold text-ivory-light">
                {occurrence.regionalObservances[0]?.muhuratVerified || 'Pradosh Kaal Lakshmi Pujan'}
              </div>
            </div>
          </div>
        ) : !timeLeft.isPast ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full md:w-auto">
            {[
              { label: locale === 'hi' ? 'दिन' : locale === 'gu' ? 'દિવસ' : 'Days', value: timeLeft.days },
              { label: locale === 'hi' ? 'घंटे' : locale === 'gu' ? 'કલાક' : 'Hours', value: timeLeft.hours },
              { label: locale === 'hi' ? 'मिनट' : locale === 'gu' ? 'મિનિટ' : 'Mins', value: timeLeft.minutes },
              { label: locale === 'hi' ? 'सेकंड' : locale === 'gu' ? 'સેકન્ડ' : 'Secs', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-charcoal/50 backdrop-blur-sm border border-gold/30 rounded-xl px-1.5 py-2.5 sm:px-3.5 sm:py-3 text-center min-w-0 sm:min-w-[74px]"
              >
                <div className="font-serif text-xl min-[375px]:text-2xl sm:text-3xl font-extrabold text-gold leading-none tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-ivory-dark uppercase tracking-wider mt-1 font-sans truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-charcoal/40 border border-gold/30 rounded-xl px-4 py-2.5 text-xs text-gold-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {locale === 'hi' ? 'सम्पन्न अनुष्ठान' : locale === 'gu' ? 'સંપન્ન અનુષ્ઠાન' : `Observed in ${occurrence.year}`}
            </span>
          </div>
        )}

        <div className="w-full md:w-auto">
          <Link
            href={`/${locale}/festivals/${festival.slug}`}
            className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-300 text-charcoal font-semibold px-5 py-3 min-h-[48px] rounded-xl shadow-md text-sm transition-all hover:translate-x-0.5 whitespace-nowrap"
          >
            <span>{isTodayFest ? (locale === 'hi' ? 'आज की पूजा विधि' : locale === 'gu' ? 'આજની પૂજા વિધિ' : 'View Today\'s Rituals') : dict.cards.viewDetails}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

