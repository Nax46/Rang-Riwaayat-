'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calendar, Utensils, Sparkles } from 'lucide-react';
import { Locale } from '../lib/types';

interface MobileBottomNavProps {
  locale: Locale;
}

export function MobileBottomNav({ locale }: MobileBottomNavProps) {
  const pathname = usePathname();

  const labels = {
    home: locale === 'hi' ? 'मुख्य' : locale === 'gu' ? 'હોમ' : 'Home',
    festivals: locale === 'hi' ? 'त्योहार' : locale === 'gu' ? 'તહેવારો' : 'Festivals',
    calendar: locale === 'hi' ? 'पंचांग' : locale === 'gu' ? 'પંચાંગ' : 'Calendar',
    recipes: locale === 'hi' ? 'व्यंजन' : locale === 'gu' ? 'વાનગીઓ' : 'Recipes',
    studio: locale === 'hi' ? 'कार्ड' : locale === 'gu' ? 'કાર્ડ્સ' : 'Studio',
  };

  const tabs = [
    { href: `/${locale}`, label: labels.home, icon: Home, exact: true },
    { href: `/${locale}/festivals`, label: labels.festivals, icon: BookOpen, exact: false },
    { href: `/${locale}/calendar`, label: labels.calendar, icon: Calendar, exact: false },
    { href: `/${locale}/recipes`, label: labels.recipes, icon: Utensils, exact: false },
    { href: `/${locale}/studio`, label: labels.studio, icon: Sparkles, exact: false },
  ];

  return (
    <nav
      aria-label="Mobile quick navigation"
      data-testid="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory-surface/95 backdrop-blur-md border-t border-gold/30 shadow-[0_-4px_18px_rgba(28,23,20,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-stretch max-w-xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center min-h-[56px] px-1 py-1.5 transition-colors ${
                isActive
                  ? 'text-vermilion font-semibold'
                  : 'text-charcoal-muted hover:text-vermilion'
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-6 rounded-full transition-colors ${
                  isActive ? 'bg-vermilion/12' : ''
                }`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.25 : 1.75} />
              </span>
              <span className="text-[10px] min-[375px]:text-[11px] leading-tight mt-0.5 truncate max-w-full">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

