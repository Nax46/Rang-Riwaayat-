import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';

export const metadata = {
  title: 'Privacy & Data Ethics Policy',
  description: 'Our commitment to privacy, zero forced registration, and local client-side card rendering.',
};

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 max-w-4xl">
      <OrnateBorderHeader
        title={dict.footer.privacyPolicy}
        subtitle="Transparent data ethics compliant with applicable Indian data protection principles"
      />

      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial space-y-6 text-charcoal text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">1. Zero Forced Registration for Visitors</h3>
          <p className="text-charcoal-muted">
            We believe cultural discovery should be open to all. Public visitors are not forced to register accounts, provide telephone numbers, or undergo intrusive tracking simply to read festival guides, participate in multiplayer quizzes, or create greeting cards.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">2. Celebration Studio & Card Designer Data</h3>
          <p className="text-charcoal-muted">
            When you enter recipient names, custom personal messages, or blessings in our Celebration Studio, all rendering takes place 100% locally on your browser via the HTML5 Canvas API. Personal text, names, and downloaded images are never uploaded or stored on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">3. Culture Passport & Game Nicknames</h3>
          <p className="text-charcoal-muted">
            Culture Passport achievement stamps are stored strictly in your browser’s `localStorage`. Guest multiplayer nicknames and temporary room PINs exist ephemerally in server memory and are automatically expunged upon room termination.
          </p>
        </section>
      </div>
    </div>
  );
}

