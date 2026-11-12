import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';

export const metadata = {
  title: 'Advertising & Monetization Disclosure',
  description: 'Our strict separation between editorial cultural content and commercial sponsorship.',
};

export default function AdvertisingPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 max-w-4xl">
      <OrnateBorderHeader
        title={dict.footer.advertisingDisclosure}
        subtitle="Transparent editorial boundaries and commercial disclosures"
      />

      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial space-y-6 text-charcoal text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">1. Free Platform Supported by Responsible Sponsorship</h3>
          <p className="text-charcoal-muted">
            Rang & Riwaayat is committed to providing free access to India’s cultural heritage. To sustain our research, hosting, and editorial verification costs, we may display clearly labeled non-intrusive advertisements or partner with verified cultural events.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-vermilion">2. Strict Separation of Church, State, & Commerce</h3>
          <p className="text-charcoal-muted">
            Commercial sponsors and advertisers have zero influence over our editorial decisions, historical claims, or calendar panchang dates. No advertisement will ever be disguised as editorial content, navigation links, quiz questions, or greeting card controls.
          </p>
        </section>
      </div>
    </div>
  );
}

