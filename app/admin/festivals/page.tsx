import React from 'react';
import { getAdminSession } from '../../../lib/auth/jwt';
import { redirect } from 'next/navigation';
import { getFestivals, getAllOccurrences } from '../../../lib/db/store';
import { getCurrentYear, getUpcomingYear } from '../../../lib/utils/date';
import Link from 'next/link';
import { Sparkles, Calendar, ExternalLink, ShieldCheck, Clock, History } from 'lucide-react';

export default async function AdminFestivalsPage() {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const currentYear = getCurrentYear();
  const upcomingYear = getUpcomingYear();

  const [festivals, allOccurrences] = await Promise.all([
    getFestivals(),
    getAllOccurrences(),
  ]);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-charcoal">
            Festivals & Occurrences Catalog
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Manage festival definitions, verified tithi occurrences ({currentYear} & {upcomingYear}), and historical records (2025).
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {festivals.map((fest) => {
          const currentOcc = allOccurrences.find((o) => o.festivalSlug === fest.slug && o.year === currentYear);
          const upcomingOcc = allOccurrences.find((o) => o.festivalSlug === fest.slug && o.year === upcomingYear);
          const historicalOcc = allOccurrences.find((o) => o.festivalSlug === fest.slug && o.year === 2025);

          return (
            <div
              key={fest.id}
              className="bg-ivory-surface rounded-2xl p-6 border border-gold/40 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold bg-gold/20 text-vermilion px-2.5 py-0.5 rounded-md">
                    {fest.category}
                  </span>
                  <span className="text-xs text-charcoal-soft font-mono">
                    /{fest.slug}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {fest.title.en}
                </h3>
                <div className="text-xs text-charcoal-muted">
                  Indic Titles: <strong>{fest.title.hi}</strong> · <strong>{fest.title.gu}</strong>
                </div>

                {/* Multi-Year Occurrence Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
                  {currentOcc && (
                    <div className="bg-gold/15 p-2 rounded-lg border border-gold/40">
                      <div className="text-[10px] uppercase font-bold text-vermilion flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Current ({currentYear})</span>
                      </div>
                      <div className="font-mono font-bold text-charcoal mt-0.5">{currentOcc.primaryDate}</div>
                      <div className="text-[10px] text-charcoal-muted truncate">{currentOcc.regionalObservances[0]?.tithiOrPanchang || 'Verified'}</div>
                    </div>
                  )}

                  {upcomingOcc && (
                    <div className="bg-ivory-light p-2 rounded-lg border border-gold/30">
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gold" />
                        <span>Upcoming ({upcomingYear})</span>
                      </div>
                      <div className="font-mono font-bold text-charcoal mt-0.5">{upcomingOcc.primaryDate}</div>
                      <div className="text-[10px] text-charcoal-muted truncate">{upcomingOcc.regionalObservances[0]?.tithiOrPanchang || 'Verified'}</div>
                    </div>
                  )}

                  {historicalOcc && (
                    <div className="bg-charcoal/5 p-2 rounded-lg border border-charcoal/20">
                      <div className="text-[10px] uppercase font-bold text-charcoal-soft flex items-center space-x-1">
                        <History className="w-3 h-3" />
                        <span>Archive (2025)</span>
                      </div>
                      <div className="font-mono font-bold text-charcoal-soft mt-0.5">{historicalOcc.primaryDate}</div>
                      <div className="text-[10px] text-charcoal-soft truncate">Historical Record</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  {fest.status}
                </span>

                <Link
                  href={`/en/festivals/${fest.slug}`}
                  target="_blank"
                  className="bg-ivory-light hover:bg-gold/20 text-charcoal border border-gold/40 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3 text-gold" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

