'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF5ED] text-[#24201D] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md space-y-4">
          <div className="text-5xl">🪔</div>
          <h2 className="font-serif text-2xl font-bold text-[#8F3026]">
            Rang & Riwaayat Cultural Archive
          </h2>
          <p className="text-xs text-[#685F59]">
            {error?.message || 'An unexpected rendering error occurred. Please try again.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-[#8F3026] text-[#FAF5ED] rounded-xl font-bold text-xs shadow-md"
          >
            Refresh Archive Entry
          </button>
        </div>
      </body>
    </html>
  );
}

