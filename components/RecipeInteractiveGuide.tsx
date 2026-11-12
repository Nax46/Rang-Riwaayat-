'use client';

import React, { useState } from 'react';
import { Recipe, Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import { Clock, Users, Play, Pause, RotateCcw, Check, BookOpen, Sparkles } from 'lucide-react';
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

  return (
    <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial">
      {/* Header */}
      <div className="border-b border-gold/20 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-gold/20 text-vermilion text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            {recipe.region}
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
            🌱 {recipe.dietaryType}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          {recipe.title[locale]}
        </h2>
        <div className="flex flex-wrap items-center gap-6 mt-4 text-xs sm:text-sm text-charcoal-muted">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-gold" />
            <span>Prep: {recipe.prepTimeMinutes} mins</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-vermilion" />
            <span>Cook: {recipe.cookTimeMinutes} mins</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Ingredients & Scaler */}
        <div className="lg:col-span-5 bg-ivory-light p-6 rounded-2xl border border-gold/40 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gold/30">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
              <Users className="w-4 h-4 text-gold" />
              <span>Yield & Servings</span>
            </h3>
            {/* Serving Size Buttons */}
            <div className="flex items-center space-x-1 bg-ivory border border-gold/40 rounded-xl p-1">
              {[4, 8, 12, 16, 24].map((s) => (
                <button
                  key={s}
                  onClick={() => setServings(s)}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    servings === s ? 'bg-vermilion text-ivory-light shadow-xs' : 'text-charcoal hover:bg-gold/15'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold text-charcoal-muted tracking-wider mb-3">
              Ingredients Checklist (Auto-Scaled)
            </h4>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const scaledAmount = Math.round(ing.amount * scale * 10) / 10;
                const isChecked = !!checkedIngredients[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gold/10 border-gold/40 text-charcoal-muted line-through opacity-70'
                        : 'bg-ivory-surface border-gold/20 hover:border-gold text-charcoal'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-vermilion border-vermilion text-ivory-light' : 'border-gold/60'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{ing.name[locale]}</span>
                    </div>
                    <span className="font-bold text-vermilion">
                      {scaledAmount} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Instructions with Real Interactive Timers */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span>Method & Step-by-Step Cooking Timers</span>
          </h3>

          <div className="space-y-4">
            {recipe.instructions.map((inst) => {
              const isCurrentTimer = activeStepTimer?.stepNumber === inst.stepNumber;
              return (
                <div
                  key={inst.stepNumber}
                  className="bg-ivory-light p-5 rounded-2xl border border-gold/30 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-vermilion text-ivory-light font-bold text-xs flex items-center justify-center">
                      {inst.stepNumber}
                    </span>
                    {inst.timerSeconds && (
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-charcoal">
                          {isCurrentTimer ? formatTimer(activeStepTimer.secondsLeft) : formatTimer(inst.timerSeconds)}
                        </span>
                        <button
                          onClick={() => startTimer(inst.stepNumber, inst.timerSeconds!)}
                          className="flex items-center space-x-1 bg-gold hover:bg-gold-300 text-charcoal px-3 py-1 rounded-lg text-xs font-bold shadow-xs transition-colors"
                        >
                          {isCurrentTimer && activeStepTimer.isRunning ? (
                            <>
                              <Pause className="w-3 h-3" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3" />
                              <span>{isCurrentTimer ? 'Resume' : 'Start Timer'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed">{inst.text[locale]}</p>
                  {inst.tip && (
                    <div className="bg-gold/15 p-2.5 rounded-xl text-xs text-charcoal-muted border-l-2 border-gold">
                      💡 <strong className="text-charcoal font-semibold">Chef’s Note:</strong> {inst.tip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cultural Lore & Origin */}
          <div className="bg-ivory-surface p-5 rounded-2xl border border-gold/40 space-y-2">
            <h4 className="font-serif text-sm font-bold text-vermilion flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Cultural Lore & Tradition</span>
            </h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">{recipe.culturalStory[locale]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

