import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { submitCorrection, getCorrections } from '../../../lib/db/store';

const CorrectionSchema = z.object({
  contentCategory: z.enum([
    'Festival Date',
    'Cultural Fact',
    'Translation Nuance',
    'Regional Variation',
    'Attribution',
  ]),
  targetSlug: z.string().min(2),
  userEmail: z.string().email().optional().or(z.literal('')),
  proposedCorrection: z.string().min(10),
  sourceCitationProvided: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = CorrectionSchema.parse(json);

    const saved = await submitCorrection(parsed);
    return NextResponse.json({ success: true, correction: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Validation failed' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const list = await getCorrections();
    return NextResponse.json({ success: true, corrections: list });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

