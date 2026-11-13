import React from 'react';
import Link from 'next/link';
import { Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import { DiyaIcon, MandalaIcon } from './MotifDecoration';
import { ShieldCheck, BookOpen, Scale, Award, HeartHandshake } from 'lucide-react';

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="bg-charcoal text-ivory-light border-t-4 border-gold">
      {/* Top Banner with Cultural Parity Commitment */}
      <div className="border-b border-charcoal-light py-6 bg-charcoal-light/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-ivory-dark">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-ivory-light mb-1">Verifiable Primary Sources</h4>
                <p className="text-charcoal-soft">Every festival occurrence and ritual is cross-referenced with the Rashtriya Panchang, national academies, and authentic community archives.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Scale className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-ivory-light mb-1">Equal Dignity & Cultural Parity</h4>
                <p className="text-charcoal-soft">Equitable, unbiased coverage across Hindu, Muslim, Sikh, Christian, Jain, Buddhist, Parsi, tribal, and regional traditions of Bharat.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <HeartHandshake className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-ivory-light mb-1">Transparent Corrections Policy</h4>
                <p className="text-charcoal-soft">We acknowledge regional nuances and calendar variations. Submit factual observations directly to our editorial review board.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-vermilion flex items-center justify-center border border-gold">
                <DiyaIcon className="w-5 h-5 text-gold" flameColor="text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gold tracking-wide">RANG & RIWAAYAT</h3>
                <p className="text-xs text-ivory-dark tracking-widest uppercase">{dict.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-soft leading-relaxed max-w-sm">
              {dict.footer.aboutText}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gold">
              <MandalaIcon className="w-4 h-4 text-gold" />
              <span>Celebrating all 28 States & 8 Union Territories</span>
            </div>
          </div>

          {/* Editorial & Exploration */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-ivory-dark">
              <li>
                <Link href={`/${locale}/festivals`} className="hover:text-gold transition-colors">
                  {dict.nav.festivals}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar`} className="hover:text-gold transition-colors">
                  {dict.nav.calendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/culture`} className="hover:text-gold transition-colors">
                  {dict.nav.culture}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/recipes`} className="hover:text-gold transition-colors">
                  {dict.nav.recipes}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/explorer`} className="hover:text-gold transition-colors">
                  {dict.nav.explorer}
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Experiences */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">
              Interactive
            </h4>
            <ul className="space-y-2 text-xs text-ivory-dark">
              <li>
                <Link href={`/${locale}/studio`} className="hover:text-gold transition-colors">
                  {dict.nav.studio} (Card Maker)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/quiz`} className="hover:text-gold transition-colors">
                  {dict.nav.funZone} (Multiplayer Quiz)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/search`} className="hover:text-gold transition-colors">
                  {dict.nav.search}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/corrections`} className="hover:text-gold transition-colors">
                  {dict.nav.corrections}
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Policies */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-ivory-dark">
              <li>
                <Link href={`/${locale}/editorial-policy`} className="hover:text-gold transition-colors">
                  {dict.footer.editorialPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/corrections`} className="hover:text-gold transition-colors">
                  {dict.footer.correctionsPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors">
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/advertising`} className="hover:text-gold transition-colors">
                  {dict.footer.advertisingDisclosure}
                </Link>
              </li>
              <li className="pt-1 border-t border-charcoal-light/40">
                <Link href="/admin/login" className="text-charcoal-soft hover:text-gold transition-colors">
                  {dict.nav.admin}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-light mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-xs text-charcoal-soft">
          <p>{dict.footer.copyright}</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <span className="text-gold/70">Languages: English · हिन्दी · ગુજરાતી</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

