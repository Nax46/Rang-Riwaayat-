import React from 'react';
import { getAdminSession } from '../../../lib/auth/jwt';
import { redirect } from 'next/navigation';
import { getCorrections } from '../../../lib/db/store';
import { AdminCorrectionsClient } from './AdminCorrectionsClient';

export default async function AdminCorrectionsPage() {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const corrections = await getCorrections();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal">
          Community Observations & Corrections
        </h1>
        <p className="text-xs text-charcoal-muted mt-1">
          Review community submissions, check primary institutional citations, and apply editorial decisions.
        </p>
      </div>

      <AdminCorrectionsClient initialCorrections={corrections} />
    </div>
  );
}

