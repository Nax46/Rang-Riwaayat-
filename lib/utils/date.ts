/**
 * Central Dynamic Date & Time Utility for Rang & Riwaayat
 * Ensures current year and dates are determined dynamically from the system clock.
 */

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getUpcomingYear(): number {
  return getCurrentYear() + 1;
}

export function getTodayISODate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isToday(dateStr: string): boolean {
  return dateStr === getTodayISODate();
}

export function isUpcoming(dateStr: string): boolean {
  return dateStr >= getTodayISODate();
}

export function isNext7Days(dateStr: string): boolean {
  const today = new Date(getTodayISODate()).getTime();
  const target = new Date(dateStr).getTime();
  const diffDays = (target - today) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

export function isThisMonth(dateStr: string): boolean {
  const today = new Date();
  const target = new Date(dateStr);
  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth()
  );
}

export function formatObservanceDate(
  dateStr: string,
  locale: 'en' | 'hi' | 'gu' = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const locTag = locale === 'hi' ? 'hi-IN' : locale === 'gu' ? 'gu-IN' : 'en-IN';
  const defaultOpts: Intl.DateTimeFormatOptions = options || {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(locTag, defaultOpts);
}

