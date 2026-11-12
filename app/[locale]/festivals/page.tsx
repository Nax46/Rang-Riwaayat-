import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { getFestivals, getOccurrences } from '../../../lib/db/store';
import { getCurrentYear, getUpcomingYear } from '../../../lib/utils/date';
import { FestivalDirectoryClient } from './FestivalDirectoryClient';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';

export const metadata = {
  title: 'Festival Discovery Directory',
  description: 'Explore the complete directory of Indian festivals, filtered by month, community, and region.',
};

export default async function FestivalsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { month?: string; community?: string; category?: string; search?: string };
}) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  const currentYear = getCurrentYear();
  const nextYear = getUpcomingYear();

  const [festivals, currentOccurrences, futureOccurrences] = await Promise.all([
    getFestivals({
      month: searchParams.month,
      community: searchParams.community,
      category: searchParams.category,
      search: searchParams.search,
    }),
    getOccurrences(currentYear),
    getOccurrences(nextYear),
  ]);

  const occurrences = [...currentOccurrences, ...futureOccurrences];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <OrnateBorderHeader
        title={dict.nav.festivals}
        subtitle="Discover ancient and living celebrations across India’s 28 States and 8 Union Territories"
      />

      <FestivalDirectoryClient
        initialFestivals={festivals}
        occurrences={occurrences}
        locale={loc}
      />
    </div>
  );
}

