import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { OrnateBorderHeader, MandalaIcon } from '../../../components/MotifDecoration';
import { ShieldCheck, BookOpen, Scale, Award } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy & Source Standards',
  description: 'Our principles of cultural neutrality, authoritative verification, and source hierarchy.',
};

export default function EditorialPolicyPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 max-w-4xl">
      <OrnateBorderHeader
        title={dict.footer.editorialPolicy}
        subtitle="The sacred trust of cultural representation and verifiable civilizational knowledge"
      />

      <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial space-y-8 text-charcoal">
        <section className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-vermilion">1. Fundamental Editorial Principles</h3>
          <p className="text-sm leading-relaxed text-charcoal-muted">
            Rang & Riwaayat was founded on the unyielding principle that India’s cultural, spiritual, and tribal diversity must be documented with absolute fidelity, dignified parity, and scholarly rigor. We do not rank religions, communities, or states. Every festival is celebrated on its own historic, philosophical, and regional terms.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-vermilion">2. Source Hierarchy & Verification</h3>
          <p className="text-sm leading-relaxed text-charcoal-muted">
            All factual claims, historical milestones, and astronomical observances published on this platform must derive from our established source hierarchy:
          </p>
          <ol className="list-decimal list-inside text-xs sm:text-sm text-charcoal space-y-2 pl-2">
            <li><strong>Government & Official Cultural Bodies:</strong> Ministry of Culture, Archaeological Survey of India (ASI), Indira Gandhi National Centre for the Arts (IGNCA), Sangeet Natak Akademi.</li>
            <li><strong>Astronomical & National Calendars:</strong> Rashtriya Panchang (Positional Astronomy Centre, IMD, Government of India).</li>
            <li><strong>Official Community Institutions:</strong> Shiromani Gurdwara Parbandhak Committee (SGPC), Central Ruet-e-Hilal Committees, Diocesan Archives, and accredited Jain/Buddhist/Parsi Trusts.</li>
            <li><strong>Peer-Reviewed Academic Publications:</strong> Renowned Indological research, folklore studies, and university presses.</li>
          </ol>
          <div className="bg-gold/15 p-4 rounded-xl border-l-4 border-gold text-xs text-charcoal">
            ⚠️ <em>Policy: Anonymous blogs, social media threads, and unverified commercial aggregators are explicitly prohibited as sole evidence for any cultural assertion.</em>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-vermilion">3. Regional Calendar & Tithi Variations</h3>
          <p className="text-sm leading-relaxed text-charcoal-muted">
            India is home to multiple solar, lunisolar, and lunar calendar traditions (Vikram Samvat, Shaka Samvat, Nanakshahi, Hijri, Kollam Era, Bengali Panjika). We explicitly document regional variances (such as North India Diwali vs Tamil Nadu pre-dawn Deepavali or Gujarat New Year) rather than homogenizing Bharat into a single fixed date.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-vermilion">4. Multilingual Review & Accuracy</h3>
          <p className="text-sm leading-relaxed text-charcoal-muted">
            Translations in Hindi (Devanagari) and Gujarati are never generated through unreviewed machine translation. Each localized edition undergoes cultural proofreading to ensure regional idioms, culinary terms, and sacred terminology retain their authentic reverence.
          </p>
        </section>
      </div>
    </div>
  );
}

