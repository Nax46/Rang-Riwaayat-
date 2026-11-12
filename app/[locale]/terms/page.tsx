import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms and intellectual property notices for Rang & Riwaayat.',
};

export default function TermsPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 max-w-4xl">
      <OrnateBorderHeader
        title={dict.footer.terms}
        subtitle="Fair use, intellectual property, and community guidelines"
      />

      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial space-y-6 text-charcoal text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">1. Permitted Use</h3>
          <p className="text-charcoal-muted">
            Rang & Riwaayat provides free, educational, cultural, and spiritual resources for personal, academic, family, and educational celebration. You may download personal greeting cards and calendar ICS files freely.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">2. Respectful Community Conduct</h3>
          <p className="text-charcoal-muted">
            In multiplayer trivia rooms, users agree to use respectful nicknames and refrain from any derogatory, communal, or defamatory language.
          </p>
        </section>
      </div>
    </div>
  );
}

