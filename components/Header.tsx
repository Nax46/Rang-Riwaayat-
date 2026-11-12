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
    <header className="sticky top-0 z-50 bg-ivory-surface/95 backdrop-blur-md border-b border-gold/30 shadow-xs">
      {/* Top Announcement Strip */}
      <div className="bg-gradient-to-r from-vermilion-700 via-vermilion to-vermilion-700 text-ivory-light py-1.5 px-4 text-xs font-medium tracking-wide flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline-block bg-gold/20 border border-gold/40 text-gold-200 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
              Official Archive
            </span>
            <span>{dict.announcement}</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <Link
              href={`/${locale}/corrections`}
              className="text-ivory-light/90 hover:text-gold transition-colors underline decoration-gold/60 underline-offset-2"
            >
              {dict.nav.corrections}
            </Link>
            <span className="text-gold/50">|</span>
            <Link
              href="/admin/login"
              className="text-ivory-light/80 hover:text-gold transition-colors"
            >
              {dict.nav.admin}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-vermilion flex items-center justify-center border-2 border-gold shadow-md group-hover:scale-105 transition-transform">
              <DiyaIcon className="w-6 h-6 text-gold" flameColor="text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black text-vermilion tracking-tight group-hover:text-vermilion-600 transition-colors uppercase">
                Rang & Riwaayat
              </span>
              <span className="text-[10px] sm:text-xs text-charcoal-muted tracking-widest font-sans font-medium uppercase">
                {dict.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? 'text-vermilion font-bold bg-gold/15 border-b-2 border-vermilion'
                      : 'text-charcoal hover:text-vermilion hover:bg-gold/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions: Search, Lang, Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Link Button */}
            <Link
              href={`/${locale}/search`}
              className="p-2 text-charcoal hover:text-vermilion rounded-full hover:bg-gold/15 transition-colors"
              title={dict.nav.search}
              aria-label="Search site"
            >
              <Search className="w-5 h-5 text-charcoal-light" />
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-charcoal hover:text-vermilion hover:bg-gold/15 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-ivory-surface border-b border-gold/40 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-vermilion text-ivory-light font-bold shadow-xs'
                      : 'bg-ivory hover:bg-gold/15 text-charcoal'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-gold" />
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-gold/20 flex items-center justify-between text-xs text-charcoal-muted px-2">
            <span>{dict.tagline}</span>
            <Link
              href={`/${locale}/corrections`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-vermilion font-medium underline"
            >
              {dict.nav.corrections}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

