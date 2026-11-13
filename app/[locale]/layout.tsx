import React from 'react';
import { Locale } from '../../lib/types';
import { getDictionary } from '../../lib/i18n';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'hi' },
    { locale: 'gu' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rangriwaayat.in';

  return {
    title: {
      template: `%s | ${dict.siteTitle}`,
      default: `${dict.siteTitle} — ${dict.tagline}`,
    },
    description: dict.siteDescription,
    alternates: {
      canonical: `${siteUrl}/${loc}`,
      languages: {
        en: `${siteUrl}/en`,
        hi: `${siteUrl}/hi`,
        gu: `${siteUrl}/gu`,
      },
    },
    openGraph: {
      title: `${dict.siteTitle} — ${dict.tagline}`,
      description: dict.siteDescription,
      url: `${siteUrl}/${loc}`,
      siteName: dict.siteTitle,
      locale: loc === 'en' ? 'en_US' : loc === 'hi' ? 'hi_IN' : 'gu_IN',
      type: 'website',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;

  return (
    <div className="flex flex-col min-h-screen overflow-x-clip" lang={loc}>
      <Header locale={loc} />
      <main className="flex-grow">{children}</main>
      <Footer locale={loc} />
      <MobileBottomNav locale={loc} />
    </div>
  );
}
