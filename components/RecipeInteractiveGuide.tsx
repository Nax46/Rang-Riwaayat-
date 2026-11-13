'use client';

import React, { useState } from 'react';
import { Recipe, Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import { Clock, Users, Play, Pause, Check, BookOpen, Sparkles, Leaf, Info } from 'lucide-react';
import { DiyaIcon } from './MotifDecoration';

interface RecipeProps {
  recipe: Recipe;
  locale: Locale;
}

export function RecipeInteractiveGuide({ recipe, locale }: RecipeProps) {
  const dict = getDictionary(locale);
  const [servings, setServings] = useState<number>(recipe.defaultServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [activeStepTimer, setActiveStepTimer] = useState<{ stepNumber: number; secondsLeft: number; isRunning: boolean } | null>(null);

  const scale = servings / recipe.defaultServings;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const startTimer = (stepNumber: number, initialSeconds: number) => {
    if (activeStepTimer?.stepNumber === stepNumber && activeStepTimer.isRunning) {
      // Pause
      setActiveStepTimer({ ...activeStepTimer, isRunning: false });
    } else if (activeStepTimer?.stepNumber === stepNumber && !activeStepTimer.isRunning) {
      // Resume
      setActiveStepTimer({ ...activeStepTimer, isRunning: true });
    } else {
      // New
      setActiveStepTimer({ stepNumber, secondsLeft: initialSeconds, isRunning: true });
    }
  };

  React.useEffect(() => {
    if (!activeStepTimer || !activeStepTimer.isRunning || activeStepTimer.secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setActiveStepTimer((prev) => {
        if (!prev || prev.secondsLeft <= 1) {
          return prev ? { ...prev, secondsLeft: 0, isRunning: false } : null;
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeStepTimer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const labels = {
    prep: locale === 'hi' ? 'तैयारी का समय' : locale === 'gu' ? 'તૈયારી સમય' : 'Prep',
    cook: locale === 'hi' ? 'पकाने का समय' : locale === 'gu' ? 'રસોઈ સમય' : 'Cook',
    minutesUnit: locale === 'hi' ? 'मिनट' : locale === 'gu' ? 'મિનિટ' : 'mins',
    yieldServings: locale === 'hi' ? 'मात्रा एवं सर्विंग्स' : locale === 'gu' ? 'સર્વિંગ્સ પ્રમાણ' : 'Yield & Servings',
    ingredientsTitle:
      locale === 'hi'
        ? 'सामग्री सूची (स्वतः समायोजित)'
        : locale === 'gu'
        ? 'સામગ્રી યાદી (આપોઆપ ગણતરી)'
        : 'Ingredients Checklist (Auto-Scaled)',
    methodTitle:
      locale === 'hi'
        ? 'बनाने की विधि और समय-सूचक'
        : locale === 'gu'
        ? 'બનાવવાની રીત અને ટાઈમર'
        : 'Method & Step-by-Step Cooking Timers',
    chefsNote: locale === 'hi' ? 'विशेष सुझाव:' : locale === 'gu' ? 'રસોઈ સલાહ:' : 'Chef’s Note:',
    loreTitle:
      locale === 'hi' ? 'पारंपरिक संदर्भ एवं कथा' : locale === 'gu' ? 'પરંપરાગત સંદર્ભ અને વાર્તા' : 'Cultural Lore & Tradition',
    pause: locale === 'hi' ? 'रोकें' : locale === 'gu' ? 'થોભો' : 'Pause',
    resume: locale === 'hi' ? 'जारी रखें' : locale === 'gu' ? 'ચાલુ કરો' : 'Resume',
    startTimer: locale === 'hi' ? 'टाइमर शुरू' : locale === 'gu' ? 'ટાઇમર શરૂ' : 'Start Timer',
  };

  return (
    <div className="bg-ivory-surface rounded-3xl p-5 sm:p-10 border border-gold/40 shadow-editorial">
      {/* Header */}
      <div className="border-b border-gold/20 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-gold/20 text-vermilion text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {recipe.region}
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold inline-flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{recipe.dietaryType}</span>
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          {recipe.title[locale]}
        </h2>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm text-charcoal-muted">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>{labels.prep}: {recipe.prepTimeMinutes} {labels.minutesUnit}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-vermilion shrink-0" />
            <span>{labels.cook}: {recipe.cookTimeMinutes} {labels.minutesUnit}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Ingredients & Scaler */}
        <div className="lg:col-span-5 bg-ivory-light p-5 sm:p-6 rounded-2xl border border-gold/40 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gold/30">
            <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal flex items-center space-x-2">
              <Users className="w-4 h-4 text-gold shrink-0" />
              <span>{labels.yieldServings}</span>
            </h3>
            {/* Serving Size Buttons */}
            <div className="flex flex-wrap items-center gap-1 bg-ivory border border-gold/40 rounded-xl p-1">
              {[4, 8, 12, 16, 24].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setServings(s)}
                  className={`min-h-[36px] min-w-[36px] px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    servings === s ? 'bg-vermilion text-ivory-light shadow-xs' : 'text-charcoal hover:bg-gold/15'
                  }`}
                  aria-label={`${s} servings`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold text-charcoal-muted tracking-wider mb-3">
              {labels.ingredientsTitle}
            </h4>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const scaledAmount = Math.round(ing.amount * scale * 10) / 10;
                const isChecked = !!checkedIngredients[idx];
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`w-full text-left min-h-[44px] flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                      isChecked
                        ? 'bg-gold/10 border-gold/40 text-charcoal-muted line-through opacity-70'
                        : 'bg-ivory-surface border-gold/20 hover:border-gold text-charcoal'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-vermilion border-vermilion text-ivory-light' : 'border-gold/60'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium truncate">{ing.name[locale]}</span>
                    </div>
                    <span className="font-bold text-vermilion shrink-0">
                      {scaledAmount} {ing.unit}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Instructions with Real Interactive Timers */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold shrink-0" />
            <span>{labels.methodTitle}</span>
          </h3>

          <div className="space-y-4">
            {recipe.instructions.map((inst) => {
              const isCurrentTimer = activeStepTimer?.stepNumber === inst.stepNumber;
              return (
                <div
                  key={inst.stepNumber}
                  className="bg-ivory-light p-4 sm:p-5 rounded-2xl border border-gold/30 space-y-3 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="w-7 h-7 rounded-full bg-vermilion text-ivory-light font-bold text-xs flex items-center justify-center shrink-0">
                      {inst.stepNumber}
                    </span>
                    {inst.timerSeconds && (
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-charcoal tabular-nums">
                          {isCurrentTimer ? formatTimer(activeStepTimer.secondsLeft) : formatTimer(inst.timerSeconds)}
                        </span>
                        <button
                          type="button"
                          onClick={() => startTimer(inst.stepNumber, inst.timerSeconds!)}
                          className="min-h-[38px] flex items-center space-x-1.5 bg-gold hover:bg-gold-300 text-charcoal px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors"
                        >
                          {isCurrentTimer && activeStepTimer.isRunning ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>{labels.pause}</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>{isCurrentTimer ? labels.resume : labels.startTimer}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed">{inst.text[locale]}</p>
                  {inst.tip && (
                    <div className="bg-gold/15 p-3 rounded-xl text-xs text-charcoal-muted border-l-2 border-gold flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-charcoal font-semibold">{labels.chefsNote}</strong> {inst.tip}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cultural Lore & Origin */}
          <div className="bg-ivory-surface p-5 rounded-2xl border border-gold/40 space-y-2">
            <h4 className="font-serif text-sm font-bold text-vermilion flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-gold shrink-0" />
              <span>{labels.loreTitle}</span>
            </h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">{recipe.culturalStory[locale]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

