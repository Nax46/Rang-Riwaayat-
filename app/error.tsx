'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="text-5xl">🪔</div>
      <h2 className="font-serif text-2xl font-bold text-vermilion">
        Temporary Cultural Archive Notice
      </h2>
      <p className="text-xs text-charcoal-muted max-w-md">
        We encountered an unexpected error loading this archive entry.
      </p>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => reset()}
          className="bg-vermilion text-ivory-light font-bold px-4 py-2 rounded-xl text-xs"
        >
          Try Again
        </button>
        <Link
          href="/en"
          className="bg-gold text-charcoal font-bold px-4 py-2 rounded-xl text-xs"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

