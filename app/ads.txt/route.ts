import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rawId =
    process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
    'pub-0000000000000000';

  const cleanPubId = rawId.trim().replace(/^ca-/, '');
  const resolvedPubId = cleanPubId.startsWith('pub-') ? cleanPubId : `pub-${cleanPubId}`;

  const content = `# Google AdSense Publisher Verification File\n# Rang & Riwaayat — Official ads.txt\ngoogle.com, ${resolvedPubId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
