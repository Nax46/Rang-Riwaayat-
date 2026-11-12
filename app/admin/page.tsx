import React from 'react';
import { getAdminSession } from '../../lib/auth/jwt';
import { redirect } from 'next/navigation';
import { getAdminMetrics, getFestivals, getAllOccurrences, getCorrections } from '../../lib/db/store';
import {
  Sparkles,
  Calendar,
  CheckSquare,
  Languages,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [metrics, festivals, occurrences, corrections] = await Promise.all([
    getAdminMetrics(),
    getFestivals(),
    getAllOccurrences(),
    getCorrections(),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gold/30 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-charcoal">
            Editorial Control Desk
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Logged in as <strong>{session.name}</strong> ({session.role})
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database Online & Verified</span>
          </span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Published Festivals', value: metrics.publishedFestivals, icon: Sparkles, color: 'text-vermilion', bg: 'bg-vermilion/10' },
          { label: 'Verified Occurrences', value: metrics.totalOccurrences, icon: Calendar, color: 'text-gold', bg: 'bg-gold/15' },
          { label: 'Pending Corrections', value: metrics.pendingCorrections, icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Supported Languages', value: metrics.languagesSupported.length, icon: Languages, color: 'text-peacock', bg: 'bg-peacock/10' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-ivory-surface p-6 rounded-2xl border border-gold/30 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                  {item.label}
                </span>
                <div className={`p-2 rounded-xl ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              <div className="font-serif text-3xl font-black text-charcoal">{item.value}</div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Corrections & Upcoming Festivals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Community Corrections */}
        <div className="lg:col-span-7 bg-ivory-surface rounded-3xl p-6 border border-gold/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gold/20">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-gold" />
              <span>Recent Community Observations</span>
            </h3>
            <Link
              href="/admin/corrections"
              className="text-xs text-vermilion font-bold hover:underline"
            >
              View All ({corrections.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {corrections.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl bg-ivory-light border border-gold/20 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-vermilion">{c.contentCategory}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      c.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : c.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-charcoal leading-relaxed">{c.proposedCorrection}</p>
                <div className="text-[11px] text-charcoal-soft font-mono">
                  Citation: {c.sourceCitationProvided}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Publishing Activity */}
        <div className="lg:col-span-5 bg-ivory-surface rounded-3xl p-6 border border-gold/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gold/20">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span>Published Content</span>
            </h3>
            <Link
              href="/admin/festivals"
              className="text-xs text-vermilion font-bold hover:underline"
            >
              Manage →
            </Link>
          </div>

          <div className="space-y-2">
            {festivals.slice(0, 5).map((f) => (
              <div
                key={f.id}
                className="p-3 rounded-xl bg-ivory-light border border-gold/20 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal">{f.title.en}</h4>
                  <div className="text-[10px] text-charcoal-muted uppercase">{f.category}</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

