'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '../lib/types';
import { LOCALES } from '../lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Replace the first locale segment e.g. /en/... or /hi/... with /newLocale/...
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'hi' || segments[1] === 'gu')) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    } else {
      router.push(`/${newLocale}`);
    }
  };

  const shortCode = (code: Locale) => (code === 'hi' ? 'हिं' : code === 'gu' ? 'ગુ' : 'EN');

  return (
    <div
      className="relative inline-flex items-center bg-ivory-light border border-gold/40 rounded-full p-0.5 shadow-sm shrink-0"
      role="group"
      aria-label="Language switcher"
    >
      <div className="hidden md:flex pl-2.5 pr-1 text-gold items-center" aria-hidden="true">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-0.5">
        {LOCALES.map((loc) => {
          const isActive = loc.code === currentLocale;
          return (
            <button
              key={loc.code}
              type="button"
              onClick={() => handleSwitch(loc.code)}
              aria-pressed={isActive}
              aria-label={`Switch to ${loc.label}`}
              className={`min-h-[36px] sm:min-h-[38px] px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-vermilion text-ivory-light font-semibold shadow-xs'
                  : 'text-charcoal hover:text-vermilion hover:bg-gold/10'
              }`}
              title={`Switch to ${loc.label}`}
            >
              <span className="sm:hidden">{shortCode(loc.code)}</span>
              <span className="hidden sm:inline">{loc.scriptName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

