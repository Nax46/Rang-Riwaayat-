import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF5ED] text-[#24201D] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="text-6xl">🪔</div>
        <h1 className="text-3xl font-serif font-bold text-[#8F3026]">Page Not Found</h1>
        <p className="text-sm text-[#685F59]">
          The celebration or cultural guide you are seeking may have been moved or updated in our archives.
        </p>
        <Link
          href="/en"
          className="inline-block bg-[#8F3026] text-[#FAF5ED] font-bold px-6 py-3 rounded-xl shadow-md text-sm hover:bg-[#6E221A] transition-colors"
        >
          Return to Rang & Riwaayat
        </Link>
      </div>
    </div>
  );
}
