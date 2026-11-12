import React from 'react';
import { Locale } from '../../../lib/types';
import { getDictionary } from '../../../lib/i18n';
import { MultiplayerGameArena } from '../../../components/MultiplayerGameArena';
import { OrnateBorderHeader } from '../../../components/MotifDecoration';
import { Gamepad2, Trophy, Users, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Multiplayer Fun Zone & Cultural Games Arena',
  description: 'Play real-time multiplayer trivia with friends or test your cultural knowledge of India.',
};

export default function QuizPage({ params }: { params: { locale: string } }) {
  const loc = (['en', 'hi', 'gu'].includes(params.locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <OrnateBorderHeader
        title={dict.quiz.title}
        subtitle={dict.quiz.subtitle}
      />

      {/* Realtime Arena Component */}
      <MultiplayerGameArena locale={loc} />
    </div>
  );
}

