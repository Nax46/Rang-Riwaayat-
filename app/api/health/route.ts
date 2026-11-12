import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      service: 'Rang & Riwaayat Platform',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || 'production',
      currentYear: new Date().getFullYear(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json',
      },
    }
  );
}

