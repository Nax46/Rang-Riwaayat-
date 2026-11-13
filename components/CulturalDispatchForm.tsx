'use client';

import React, { useState } from 'react';
import { Locale } from '../lib/types';
import { CheckCircle2, AlertCircle, Info, Loader2, ArrowRight } from 'lucide-react';

interface CulturalDispatchFormProps {
  locale: Locale;
}

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    subtext: string;
    placeholder: string;
    button: string;
    loading: string;
    invalidEmail: string;
    networkError: string;
    subscribedTitle: string;
    subscribedDesc: string;
    alreadyTitle: string;
    alreadyDesc: string;
    reset: string;
    emailLabel: string;
  }
> = {
  en: {
    eyebrow: 'Seasonal Panchang Letters',
    heading: 'Receive Monthly Festival & Regional Almanac Notes',
    subtext:
      'Verified lunar-solar festival dates, seasonal kitchen essays, and regional observance notes — delivered ahead of each lunar fortnight.',
    placeholder: 'you@example.com',
    button: 'Subscribe',
    loading: 'Saving...',
    invalidEmail: 'Please enter a valid email address.',
    networkError: 'Could not reach the dispatch service. Please try again in a moment.',
    subscribedTitle: 'You are added to the seasonal almanac dispatch.',
    subscribedDesc: 'We will write ahead of major regional festivals and Panchang updates.',
    alreadyTitle: 'This email is already subscribed.',
    alreadyDesc: 'You are already on our list for upcoming festival and recipe dispatches.',
    reset: 'Use another email',
    emailLabel: 'Email address',
  },
  hi: {
    eyebrow: 'मासिक पंचांग पत्रिका',
    heading: 'आगामी पर्वों, क्षेत्रीय परंपराओं और पाक विधियों का संकलन पाएं',
    subtext:
      'सत्यापित तिथि व मुहूर्त विवरण, मौसमी रसोई लेख और भारत के विभिन्न राज्यों के उत्सव नोट्स सीधे आपके इनबॉक्स में।',
    placeholder: 'आपका-ईमेल@example.com',
    button: 'सदस्य बनें',
    loading: 'सहेजा जा रहा है...',
    invalidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
    networkError: 'अभी सेवा से संपर्क नहीं हो सका। कृपया थोड़ी देर बाद पुनः प्रयास करें।',
    subscribedTitle: 'मासिक पंचांग पत्रिका के लिए आपका ईमेल जुड़ गया है।',
    subscribedDesc: 'प्रमुख पर्वों और क्षेत्रीय परंपराओं से पहले आपको सूचना भेजी जाएगी।',
    alreadyTitle: 'यह ईमेल पहले से ही पंजीकृत है।',
    alreadyDesc: 'आप हमारी आगामी पंचांग और व्यंजन सूची में पहले से शामिल हैं।',
    reset: 'अन्य ईमेल दर्ज करें',
    emailLabel: 'ईमेल पता',
  },
  gu: {
    eyebrow: 'માસિક પંચાંગ પત્રિકા',
    heading: 'આગામી તહેવારો, પ્રાદેશિક પરંપરાઓ અને વાનગીઓની નોંધ મેળવો',
    subtext:
      'પ્રમાણિત તિથિ અને મુહૂર્તની વિગતો, ઋતુ મુજબની રસોઈ નોંધો અને ભારતભરના પ્રાદેશિક ઉત્સવોની માહિતી.',
    placeholder: 'તમારું-ઇમેઇલ@example.com',
    button: 'જોડાઓ',
    loading: 'સંગ્રહાઈ રહ્યું છે...',
    invalidEmail: 'કૃપા કરીને માન્ય ઇમેઇલ સરનામું દાખલ કરો.',
    networkError: 'અત્યારે સેવા સાથે જોડાણ થઈ શક્યું નથી. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
    subscribedTitle: 'માસિક પંચાંગ પત્રિકા માટે તમારું ઇમેઇલ ઉમેરાયું છે.',
    subscribedDesc: 'મુખ્ય તહેવારો અને પંચાંગ અપડેટ પહેલાં તમને માહિતી મોકલવામાં આવશે.',
    alreadyTitle: 'આ ઇમેઇલ પહેલેથી જ નોંધાયેલું છે.',
    alreadyDesc: 'તમે અમારી આગામી તહેવાર અને વાનગી યાદીમાં પહેલેથી જ સામેલ છો.',
    reset: 'બીજું ઇમેઇલ ઉમેરો',
    emailLabel: 'ઇમેઇલ સરનામું',
  },
};

export function CulturalDispatchForm({ locale }: CulturalDispatchFormProps) {
  const copy = COPY[locale] || COPY.en;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'subscribed' | 'already' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMessage(copy.invalidEmail);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, locale }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || copy.invalidEmail);
        return;
      }

      if (data.status === 'already_subscribed') {
        setStatus('already');
      } else {
        setStatus('subscribed');
      }
    } catch {
      setStatus('error');
      setErrorMessage(copy.networkError);
    }
  };

  return (
    <div className="bg-ivory-surface border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-editorial">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-vermilion">{copy.eyebrow}</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
          {copy.heading}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">{copy.subtext}</p>

        {status === 'subscribed' || status === 'already' ? (
          <div
            aria-live="polite"
            className={`mt-6 rounded-2xl p-5 border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              status === 'subscribed'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/90 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {status === 'subscribed' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-sm">
                <p className="font-semibold">
                  {status === 'subscribed' ? copy.subscribedTitle : copy.alreadyTitle}
                </p>
                <p className="text-xs opacity-90">
                  {status === 'subscribed' ? copy.subscribedDesc : copy.alreadyDesc} ({email})
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('');
                setStatus('idle');
                setErrorMessage('');
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-current/25 text-xs font-semibold hover:bg-white/60 transition-colors shrink-0 self-start sm:self-auto"
            >
              {copy.reset}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-lg mx-auto space-y-3">
            <label htmlFor="cultural-dispatch-email" className="sr-only">
              {copy.emailLabel}
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <input
                id="cultural-dispatch-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setErrorMessage('');
                  }
                }}
                placeholder={copy.placeholder}
                className="flex-1 min-h-[48px] px-4 py-3 rounded-xl bg-ivory-light border border-gold/50 text-sm text-charcoal placeholder:text-charcoal-muted/70 focus:outline-none focus:border-vermilion focus:ring-2 focus:ring-vermilion/15"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-vermilion hover:bg-vermilion-600 disabled:opacity-60 text-ivory-light font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{copy.loading}</span>
                  </>
                ) : (
                  <>
                    <span>{copy.button}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && errorMessage && (
              <p
                role="alert"
                className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

