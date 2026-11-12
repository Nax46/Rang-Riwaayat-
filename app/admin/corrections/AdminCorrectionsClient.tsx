'use client';

import React, { useState } from 'react';
import { CommunityCorrectionReport } from '../../../lib/types';
import { Check, X, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export function AdminCorrectionsClient({ initialCorrections }: { initialCorrections: CommunityCorrectionReport[] }) {
  const [corrections, setCorrections] = useState<CommunityCorrectionReport[]>(initialCorrections);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, status: 'Accepted' | 'Rejected') => {
    setLoadingId(id);
    const notes = adminNotes[id] || '';

    try {
      const res = await fetch('/api/admin/corrections', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminNotes: notes }),
      });

      if (res.ok) {
        setCorrections((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status, adminNotes: notes } : c))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {corrections.map((corr) => (
        <div
          key={corr.id}
          className="bg-ivory-surface rounded-2xl p-6 border border-gold/40 shadow-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gold/20">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold bg-vermilion/10 text-vermilion px-2.5 py-1 rounded-md">
                {corr.contentCategory}
              </span>
              <span className="text-xs text-charcoal-muted">
                Target: <strong>/{corr.targetSlug}</strong>
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-charcoal-soft font-mono">
                {new Date(corr.submittedAt).toLocaleDateString()}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-bold ${
                  corr.status === 'Accepted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : corr.status === 'Rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {corr.status}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-charcoal uppercase tracking-wider">
              Observation Submitted:
            </div>
            <p className="text-sm text-charcoal bg-ivory-light p-3.5 rounded-xl border border-gold/20 leading-relaxed">
              {corr.proposedCorrection}
            </p>
          </div>

          <div className="text-xs text-charcoal-muted">
            <strong>Authoritative Source Provided:</strong>{' '}
            <span className="font-mono text-charcoal">{corr.sourceCitationProvided}</span>
            {corr.userEmail && (
              <span className="block mt-0.5 text-charcoal-soft">
                Submitted by: {corr.userEmail}
              </span>
            )}
          </div>

          {corr.adminNotes && (
            <div className="bg-gold/15 p-3 rounded-xl text-xs text-charcoal border-l-2 border-gold">
              <strong>Editorial Decision Note:</strong> {corr.adminNotes}
            </div>
          )}

          {corr.status === 'Pending Review' && (
            <div className="pt-3 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Add editorial verification notes..."
                value={adminNotes[corr.id] || ''}
                onChange={(e) => setAdminNotes({ ...adminNotes, [corr.id]: e.target.value })}
                className="w-full sm:w-80 px-3 py-2 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden"
              />

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  disabled={loadingId === corr.id}
                  onClick={() => handleAction(corr.id, 'Accepted')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Accept & Verify</span>
                </button>
                <button
                  disabled={loadingId === corr.id}
                  onClick={() => handleAction(corr.id, 'Rejected')}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

