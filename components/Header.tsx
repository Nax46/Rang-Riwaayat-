'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DiyaIcon } from './MotifDecoration';
import { Menu, X, Search, Sparkles, Compass, Utensils, Calendar, Gamepad2, Palette } from 'lucide-react';

export function Header({ locale }: { locale: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home, icon: DiyaIcon },
    { href: `/${locale}/festivals`, label: dict.nav.festivals, icon: Sparkles },
    { href: `/${locale}/calendar`, label: dict.nav.calendar, icon: Calendar },
    { href: `/${locale}/culture`, label: dict.nav.culture, icon: Compass },
    { href: `/${locale}/recipes`, label: dict.nav.recipes, icon: Utensils },
    { href: `/${locale}/studio`, label: dict.nav.studio, icon: Palette },
    { href: `/${locale}/quiz`, label: dict.nav.funZone, icon: Gamepad2 },
    { href: `/${locale}/explorer`, label: dict.nav.explorer, icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ivory-surface/95 backdrop-blur-md border-b border-gold/25 shadow-xs">
      {/* Main Header */}
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-[74px]">
          {/* Logo & Brand Identity */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 sm:gap-3 min-w-0 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full bg-vermilion flex items-center justify-center border-2 border-gold shadow-sm group-hover:scale-105 transition-transform">
              <DiyaIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" flameColor="text-amber-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-[15px] min-[380px]:text-lg sm:text-2xl font-black text-vermilion tracking-tight group-hover:text-vermilion-600 transition-colors uppercase whitespace-nowrap leading-none">
                Rang &amp; Riwaayat
              </span>
              <span className="hidden sm:block text-[11px] text-charcoal-muted tracking-[0.14em] font-sans font-medium uppercase mt-1 truncate">
                {dict.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all border-b-2 ${
                    isActive
                      ? 'text-vermilion font-semibold border-vermilion'
                      : 'text-charcoal border-transparent hover:text-vermilion hover:border-gold/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions: Search, Lang, Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Link Button (shown in drawer on <sm screens so 320px stays uncrowded) */}
            <Link
              href={`/${locale}/search`}
              className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-charcoal hover:text-vermilion rounded-full hover:bg-gold/15 transition-colors"
              title={dict.nav.search}
              aria-label="Search site"
            >
              <Search className="w-5 h-5 text-charcoal-light" />
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-charcoal hover:text-vermilion hover:bg-gold/15 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-ivory-surface border-b border-gold/40 px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href={`/${locale}/search`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-ivory-light border border-gold/40 text-sm text-charcoal hover:border-vermilion transition-colors"
          >
            <span className="flex items-center gap-2.5 font-medium">
              <Search className="w-4 h-4 text-vermilion shrink-0" />
              <span>{dict.nav.search}</span>
            </span>
            <span className="text-xs text-charcoal-muted">&rarr;</span>
          </Link>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 min-h-[46px] px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-vermilion text-ivory-light border-vermilion font-semibold shadow-xs'
                      : 'bg-ivory border-gold/25 hover:bg-gold/15 text-charcoal'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-ivory-light' : 'text-vermilion'}`} />
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gold/25 flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-muted">
            <Link
              href={`/${locale}/about`}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center min-h-[44px] px-2 text-charcoal hover:text-vermilion font-medium"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${locale}/corrections`}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center min-h-[44px] px-2 text-vermilion font-semibold underline underline-offset-4"
            >
              {dict.nav.corrections}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

