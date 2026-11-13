import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { getRecipes } from '../../../lib/db/store';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';
import Link from 'next/link';
import { Utensils, Clock, Users, ChevronRight, Leaf } from 'lucide-react';

export const metadata = {
  title: 'Traditional Festive Food & Sacred Prasad',
  description: 'Authentic festival recipes with dynamic ingredient recalculation, cooking timers, and cultural origins.',
};

export default async function RecipesPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <OrnateBorderHeader
        title={dict.nav.recipes}
        subtitle="Savor the culinary traditions, prasad preparations, and festive delicacies across India"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recipes.map((rec) => (
          <article
            key={rec.id}
            className="bg-ivory-surface rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-editorial hover:shadow-editorial-lg transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs bg-gold/20 text-vermilion font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {rec.region}
              </span>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                🌱 {rec.dietaryType}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-charcoal">
              <Link href={`/${loc}/recipes/${rec.slug}`} className="hover:text-vermilion transition-colors">
                {rec.title[loc]}
              </Link>
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-3">
              {rec.culturalStory[loc]}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gold/20 text-xs">
              <div className="flex items-center space-x-3 text-charcoal-muted">
                <span>⏱️ {rec.prepTimeMinutes + rec.cookTimeMinutes} mins total</span>
                <span>•</span>
                <span>🍽️ Serves {rec.defaultServings}</span>
              </div>
              <Link
                href={`/${loc}/recipes/${rec.slug}`}
                className="bg-gold hover:bg-gold-300 text-charcoal font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                {dict.cards.viewRecipe} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

