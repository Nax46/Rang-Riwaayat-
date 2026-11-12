import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { getFestivals, getAllOccurrences } from '../../../lib/db/store';
import { getCurrentYear, getUpcomingYear } from '../../../lib/utils/date';
import { InteractiveFestivalCalendar } from '../../../components/InteractiveFestivalCalendar';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';

export async function generateMetadata() {
  const currentYear = getCurrentYear();
  const nextYear = getUpcomingYear();
  return {
    title: `Pan-India Festival Calendar ${currentYear} – ${nextYear}`,
    description: `Verified astronomical and religious calendar covering Hindu, Muslim, Sikh, Christian, Jain, Buddhist, and tribal celebrations for ${currentYear} and ${nextYear}.`,
  };
}

export default async function CalendarPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  const [festivals, occurrences] = await Promise.all([
    getFestivals(),
    getAllOccurrences(),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <OrnateBorderHeader
        title={dict.calendar.title}
        subtitle={dict.calendar.subtitle}
      />

      <InteractiveFestivalCalendar
        festivals={festivals}
        occurrences={occurrences}
        locale={loc}
      />
    </div>
  );
}

