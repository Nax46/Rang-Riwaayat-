'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiyaIcon } from '../../../components/MotifDecoration';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError('Network communication failed. Please check server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-vermilion border-2 border-gold mx-auto flex items-center justify-center shadow-lg">
            <DiyaIcon className="w-8 h-8 text-gold" flameColor="text-amber-300" />
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-gold tracking-wide">
            RANG & RIWAAYAT
          </h2>
          <p className="text-xs uppercase tracking-widest text-ivory-dark">
            Private Editorial & Administration Portal
          </p>
        </div>

        <div className="bg-ivory-surface p-8 rounded-3xl border border-gold/40 shadow-editorial-lg space-y-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-vermilion bg-gold/15 p-3 rounded-xl border border-gold/30">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span>Authorized Editorial Personnel Only. Public registration is closed.</span>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-300 text-red-800 text-xs rounded-xl flex items-center space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rangriwaayat.in"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-ivory-light border border-gold/40 rounded-xl text-sm text-charcoal focus:outline-hidden focus:ring-2 focus:ring-vermilion"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-ivory-light border border-gold/40 rounded-xl text-sm text-charcoal focus:outline-hidden focus:ring-2 focus:ring-vermilion"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vermilion hover:bg-vermilion-600 text-ivory-light font-bold py-3 rounded-xl shadow-md text-sm transition-all flex items-center justify-center space-x-2 hover:scale-[1.01]"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-charcoal-muted">
            <Link href="/en" className="hover:text-vermilion underline">
              ← Return to Rang & Riwaayat Homepage
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-ivory-dark/60">
          Initial setup bootstrap enabled via server environment credentials.
        </div>
      </div>
    </div>
  );
}

