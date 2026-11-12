import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '../../../../lib/types';
import { getDictionary } from '../../../../lib/i18n';
import { getRecipeBySlug } from '../../../../lib/db/store';
import { RecipeInteractiveGuide } from '../../../../components/RecipeInteractiveGuide';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const locales = ['en', 'hi', 'gu'];
  const slugs = ['gujiya-karanji', 'sheer-khurma'];
  const params: Array<{ locale: string; slug: string }> = [];
  for (const loc of locales) {
    for (const slug of slugs) {
      params.push({ locale: loc, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const recipe = await getRecipeBySlug(params.slug);
  if (!recipe) return {};

  return {
    title: `${recipe.title[loc]} — Interactive Recipe & Timers`,
    description: recipe.culturalStory[loc],
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RecipeInteractiveGuide recipe={recipe} locale={loc} />
    </div>
  );
}
