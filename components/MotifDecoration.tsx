import React from 'react';

export function DiyaIcon({ className = 'w-6 h-6 text-gold', flameColor = 'text-amber-500' }: { className?: string; flameColor?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Flame */}
      <path
        d="M24 4C24 4 19 12 19 17C19 20.3137 21.2386 23 24 23C26.7614 23 29 20.3137 29 17C29 12 24 4 24 4Z"
        fill="currentColor"
        className={flameColor}
      />
      {/* Flame inner glow */}
      <path
        d="M24 10C24 10 21.5 14 21.5 17C21.5 18.5 22.6 19.5 24 19.5C25.4 19.5 26.5 18.5 26.5 17C26.5 14 24 10 24 10Z"
        fill="#FFF9E6"
      />
      {/* Clay Lamp Base */}
      <path
        d="M6 24C8 36 16 42 24 42C32 42 40 36 42 24C36 28 28 29 24 29C20 29 12 28 6 24Z"
        fill="currentColor"
      />
      {/* Stand */}
      <path d="M18 42H30V44H18V42Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function MandalaIcon({ className = 'w-8 h-8 text-gold' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="32" cy="32" r="6" />
      <circle cx="32" cy="32" r="14" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="24" />
      {/* Petals */}
      <path d="M32 8 C35 14 35 18 32 20 C29 18 29 14 32 8 Z" />
      <path d="M32 44 C35 46 35 50 32 56 C29 50 29 46 32 44 Z" />
      <path d="M8 32 C14 35 18 35 20 32 C18 29 14 29 8 32 Z" />
      <path d="M44 32 C46 35 50 35 56 32 C50 29 46 29 44 32 Z" />
      <path d="M15 15 C21 19 23 23 20 26 C17 23 13 21 15 15 Z" />
      <path d="M49 49 C43 45 41 41 44 38 C47 41 51 43 49 49 Z" />
      <path d="M49 15 C43 19 41 23 44 26 C47 23 51 21 49 15 Z" />
      <path d="M15 49 C21 45 23 41 20 38 C17 41 13 43 15 49 Z" />
    </svg>
  );
}

export function KalashIcon({ className = 'w-6 h-6 text-gold' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      {/* Coconut atop */}
      <circle cx="24" cy="12" r="6" fill="currentColor" fillOpacity="0.2" />
      {/* Mango leaves */}
      <path d="M18 16C14 12 16 8 20 10" />
      <path d="M30 16C34 12 32 8 28 10" />
      {/* Pot neck */}
      <path d="M16 20H32" strokeWidth="2.5" />
      {/* Pot belly */}
      <path d="M16 20C12 24 10 32 16 38C20 42 28 42 32 38C38 32 36 24 32 20" fill="currentColor" fillOpacity="0.15" />
      {/* Swastika/Shubh marker */}
      <circle cx="24" cy="30" r="2" fill="currentColor" />
    </svg>
  );
}

export function OrnateBorderHeader({ title, subtitle, className = '' }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={`text-center relative py-4 ${className}`}>
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold" />
        <MandalaIcon className="w-5 h-5 text-gold animate-spin-slow" />
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold" />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

