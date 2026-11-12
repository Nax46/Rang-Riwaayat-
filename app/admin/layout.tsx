import React from 'react';
import { getAdminSession } from '../../lib/auth/jwt';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { DiyaIcon } from '../../components/MotifDecoration';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Languages,
  CheckSquare,
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Let the login page render freely without redirection loop
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}

function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const session = getAdminSession();

  return (
    <div className="min-h-screen bg-ivory-light flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-charcoal text-ivory-light flex flex-col justify-between p-6 border-r border-gold/30 shrink-0">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-vermilion flex items-center justify-center border border-gold shrink-0">
              <DiyaIcon className="w-5 h-5 text-gold" flameColor="text-amber-300" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-gold">RANG & RIWAAYAT</div>
              <div className="text-[10px] text-ivory-dark uppercase tracking-widest font-mono">
                Admin Console
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-medium">
            <Link
              href="/admin"
              className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gold/15 transition-colors text-ivory-light"
            >
              <LayoutDashboard className="w-4 h-4 text-gold" />
              <span>Metrics & Dashboard</span>
            </Link>
            <Link
              href="/admin/festivals"
              className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gold/15 transition-colors text-ivory-light"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Festivals & Occurrences</span>
            </Link>
            <Link
              href="/admin/corrections"
              className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gold/15 transition-colors text-ivory-light"
            >
              <CheckSquare className="w-4 h-4 text-gold" />
              <span>Community Corrections</span>
            </Link>
            <Link
              href="/admin/translations"
              className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gold/15 transition-colors text-ivory-light"
            >
              <Languages className="w-4 h-4 text-gold" />
              <span>Translation Workflow</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gold/15 transition-colors text-ivory-light"
            >
              <Settings className="w-4 h-4 text-gold" />
              <span>Monetization & Ads</span>
            </Link>
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="pt-6 border-t border-charcoal-light space-y-3">
          <div className="text-xs">
            <div className="text-ivory-light font-bold truncate">
              {session?.name || 'Administrator'}
            </div>
            <div className="text-gold text-[10px] truncate">{session?.role || 'SuperAdmin'}</div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <Link
              href="/en"
              target="_blank"
              className="text-ivory-dark hover:text-gold flex items-center space-x-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="text-vermilion-200 hover:text-red-400 flex items-center space-x-1 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}

