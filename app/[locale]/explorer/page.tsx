import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { getAllStatesUTs } from '../../../lib/db/store';
import { IndiaStateExplorer } from '../../../components/IndiaStateExplorer';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';

export const metadata = {
  title: 'Pan-Bharat Culture Explorer & Digital Passport',
  description: 'Interactive cultural atlas of India covering all 28 states & 8 Union Territories.',
};

export default async function ExplorerPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);
  const states = await getAllStatesUTs();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <OrnateBorderHeader
        title={dict.nav.explorer}
        subtitle="Journey through all 28 States and 8 Union Territories and collect your digital Culture Passport stamps"
      />

      <IndiaStateExplorer states={states} locale={loc} />
    </div>
  );
}

